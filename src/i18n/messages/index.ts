import ar from "./ar";
import en from "./en";
import type { Locale } from "../config";
import type { Messages } from "./types";

export const MESSAGES: Record<Locale, Messages> = { en, ar };
