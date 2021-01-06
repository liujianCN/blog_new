declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.webp' {
  const url: string;
  export default url;
}

declare module '*.webm' {
  const url: string;
  export default url;
}

declare module '*.mp4' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

/**
 * 考虑使用 typed-css-modules 对 less 自动生成 d.ts （主要是需要开进程 watch 编译，比较麻烦）
 * 或者调研 TypeScript 扩展
 */
declare module '*.less' {
  const styles: Record<string, string>;
  export default styles;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => void;
}
