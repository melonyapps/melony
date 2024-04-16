import { serve } from "@melony/next";
import { melonyConfig } from "../../../../melony.config";

export const { GET, POST, PUT, DELETE } = serve(melonyConfig);
