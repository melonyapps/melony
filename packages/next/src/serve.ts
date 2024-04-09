import { NextRequest, NextResponse } from "next/server";
import { Config } from "@melony/core/config";
import { getParams } from "./utils";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import EventEmitter from "events";
import queryString from "qs";

export const serve = (config: Config) => {
  const { id, adapter, collections, triggers } = config;

  const dbCrudAdapter = adapter({ id, collections });

  const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: dbCrudAdapter.auth,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
  });

  const eventEmitter = new EventEmitter();

  eventEmitter.on("docChange", async (changeEvent) => {
    Object.keys(triggers).map((triggerKey) => {
      const trigger = triggers[triggerKey];

      if (trigger?.collectionSlug === changeEvent.collectionSlug) {
        if (trigger?.on?.includes(changeEvent.type)) {
          // execute
          trigger.task({ dbCrudAdapter, type: changeEvent.type }); // TODO: dbCrudAdapter or db? need to decide
        }
      }
    });
  });

  return {
    GET: async (req: NextRequest) => {
      const params = getParams(req);
      const searchParams = req.nextUrl.searchParams;
      const search = req.nextUrl.search;

      const parsedQs = queryString.parse(search);
      const filter = parsedQs?.["filter"];
      const sort = parsedQs?.["sort"];
      const searchTerm = parsedQs?.["searchTerm"];

      // auth (used for callbacks)
      if (params?.[0] === "auth") {
        return handlers.GET(req);
      }

      if (params?.[0] === "init") {
        return Response.json(config);
      }

      // db actions
      // length === 1 - list
      if (params.length === 1) {
        if (params[0] === "suggestions") {
          try {
            const res = await dbCrudAdapter.getSuggestions({
              collectionSlug: searchParams.get("collectionSlug") || "unknown",
            });

            return Response.json(res);
          } catch (err) {
            return Response.json({});
          }
        }

        const collectionSlug = params[0] || "unknown";

        try {
          const res = await dbCrudAdapter.getDocuments({
            collectionSlug,
            searchTerm,
            filter,
            sort,
          });

          return Response.json(res);
        } catch (err) {
          return Response.json({});
        }
      }

      // length === 2 - show
      if (params.length === 2) {
        const collectionSlug = params[0] || "unknown";
        const docId = params[1] || "unknown";

        try {
          const res = await dbCrudAdapter.getDocument({
            collectionSlug,
            docId,
          });

          return Response.json(res);
        } catch (err) {
          return Response.json({});
        }
      }

      return Response.json({});
    },
    POST: async (req: NextRequest) => {
      const params = getParams(req);

      if (params?.[0] === "login") {
        try {
          const redirectUrl = await signIn("google", { redirect: false });
          return Response.json({ redirectUrl });
        } catch (err) {}
      }

      if (params?.[0] === "logout") {
        try {
          await signOut({ redirect: false });

          return NextResponse.json({ redirectUrl: "/login" });
        } catch (err) {}
      }

      // create
      if (params.length === 1) {
        try {
          const collectionSlug = params[0] || "unknown";

          const data = await req.json();

          await dbCrudAdapter.createDocument({
            collectionSlug,
            data,
            auth,
          });

          eventEmitter.emit("docChange", {
            type: "create",
          });

          return Response.json({});
        } catch (err) {}
      }

      return Response.json({});
    },
    PUT: auth(async (req) => {
      const params = getParams(req);

      // update doc
      if (params.length === 2) {
        try {
          const collectionSlug = params[0] || "unknown";
          const docId = params[1] || "unknown";

          const data = await req.json();

          await dbCrudAdapter.updateDocument({
            collectionSlug,
            docId,
            data,
          });

          eventEmitter.emit("docChange", {
            type: "update",
            collectionSlug,
          });

          return Response.json({});
        } catch (err) {}
      }

      return Response.json({});
    }),
    DELETE: auth(async (req) => {
      const params = getParams(req);

      // delete doc
      if (params.length === 2) {
        try {
          const collectionSlug = params[0] || "unknown";
          const docId = params[1] || "unknown";

          await dbCrudAdapter.deleteDocument({
            collectionSlug,
            docId,
          });

          eventEmitter.emit("docChange", {
            type: "delete",
            collectionSlug,
          });

          return Response.json({});
        } catch (err) {}
      }

      return Response.json({});
    }),
  };
};
