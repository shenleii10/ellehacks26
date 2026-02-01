declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // add other env variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
  }