const path = require('path');
const fs = require('fs');

// 开发还是生产
const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const isProd = mode === 'production';

// 获取绝对地址
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const when = (condition, match = [], noMatch = []) => (condition ? match : noMatch);
const whenDev = (match, noMatch) => when(isDev, match, noMatch);
const whenProd = (match, noMatch) => when(isProd, match, noMatch);

module.exports = {
  mode,
  paths: {
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appNodeModules: resolveApp('node_modules')
  },
  when,
  whenDev,
  whenProd,
  isEnvProduction: isProd,
  isEnvDevelopment: isDev,
  resolveApp,

  // 常用变量
  port: 3008,
  proxy: {
    // '/api': 'https://liujiancn.cn',
    // changeOrigin: true,
    // '/api': 'http://127.0.0.1:3000'
  },
  outputPublicPath: '/',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  }
};
