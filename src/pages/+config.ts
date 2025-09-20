import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import { tr } from "date-fns/locale";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",

  prerender: true,
  ssr: true,

  extends: vikeReact,
} satisfies Config;
