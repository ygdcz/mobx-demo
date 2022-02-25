// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ISafeAny = any;

declare module '*.svg' {
  const content: ISafeAny;
  export default content;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

interface IConfig {
  web_url: string;
  sentry?: {
    open?: boolean;
    dsn?: string;
  };
}

interface Window {
  _STORES: ISafeAny;
  _BUILD_INFO: {
    VERSION: string;
    CI_COMMIT_SHA: string;
    CI_BUILD_TIME: string;
  };
}
