"use client";

import React from "react";
import { useConfig } from "@melony/core/react";
import { cn } from "@melony/ui/lib";
import { NavigationItemProps } from "@melony/core/config";
import * as icons from "lucide-react";
import { useMelonyPathname } from "../hooks/use-melony-pathname";
import { useMelonyNavigate } from "../hooks/use-melony-navigate";
import { NavigationItem } from "@melony/ui/navigation";

export function Navigation() {
	const pathname = useMelonyPathname();
	const navigate = useMelonyNavigate();
	const { config } = useConfig();

	const collections = config?.collections || [];

	const ViewsFlatten: NavigationItemProps[] = [];

	// TODO: keeping reduce here for nested navigation if needed
	const Views = collections.reduce(
		(prev, curr) => {
			if (curr?.views) {
				prev[curr?.label || curr.slug] = (curr?.views || []).map((view) => {
					const viewItem = {
						title: view?.label || view.slug,
						to: `/c/${curr.slug}/v/${view.slug}`,
						icon: view?.icon || "Eye",
					};

					ViewsFlatten.push(viewItem);

					return viewItem;
				});
			}

			return prev;
		},
		{} as Record<string, NavigationItemProps[]>,
	);

	const defaultNav: Record<string, NavigationItemProps[]> = {};

	// if (ViewsFlatten.length > 0) {
	// 	defaultNav["Views"] = ViewsFlatten;
	// }

	if (collections.length > 0) {
		defaultNav["Collections"] = collections.map((collection) => ({
			title: collection?.label || collection.slug,
			to: `/c/${collection.slug}/v/base`,
			icon: "Folder",
		}));
	}

	const nav = config?.ui?.navigation || defaultNav;

	return (
		<div className="flex flex-col gap-2">
			{Object.keys(nav).map((title) => {
				return (
					<div key={title}>
						<div className="text-xs opacity-60 p-2.5">{title}</div>

						<nav className="flex flex-col gap-0.5">
							{(nav?.[title] || []).map((item) => {
								const Icon = icons[item?.icon || "Folder"];

								return (
									<NavigationItem
										key={item.to}
										onClick={() => {
											navigate(item.to);
										}}
										icon={Icon && <Icon className="h-4 w-4 mr-2.5" />}
										title={item?.title}
										active={pathname.includes(item.to)}
									/>
								);
							})}
						</nav>
					</div>
				);
			})}
		</div>
	);
}
