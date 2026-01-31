declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

interface ImportMetaEnv {
    readonly VITE_ELEVENLABS_API_KEY: string
    // Add other env variables here if needed in the future
}

interface ImportMeta {
    readonly env: ImportMetaEnv
  }