import { OpenAIModel } from "@/types/Model";

export const LS_UUID = "@ls/uuid";

export const DEFAULT_OPENAI_MODEL = {
  name: "GPT-3 Turbo",
  id: "gpt-3.5-turbo-0125",
  available: true,
};

export const GPT_4_TURBO = {
  name: "GPT-4 Turbo",
  id: "gpt-4-0125-preview",
  available: true,
};

export const GPT_4_32k = {
  name: "GPT-4",
  id: "gpt-4",
  available: true,
};

export const GPT4_TURBO_OPENAI_MODEL = {};

export const OPENAI_MODELS: OpenAIModel[] = [
  DEFAULT_OPENAI_MODEL,
  GPT_4_TURBO,
  GPT_4_32k,
];
