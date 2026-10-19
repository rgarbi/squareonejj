interface ImportMetaEnv {
  readonly PUBLIC_SITE_ENV?: 'production' | 'staging';
  readonly PUBLIC_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
