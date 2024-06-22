import 'vite/client'; // Ensure Vite types are included

// Declare the shape of your environment variables
interface ImportMetaEnv {
  readonly DEV: boolean;
  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}