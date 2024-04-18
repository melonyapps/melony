import { melonyConfig } from "@/melony.config";
import { serve } from "@melony/next";

export const { GET, POST, PUT, DELETE } = serve(melonyConfig);
