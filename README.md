# cocos2d-js es6环境搭建模板
推荐代码编辑器 [Visual Studio Code](https://code.visualstudio.com/)


## Visual Studio Code配置
```js
// File => Perferences => Workspace Settings
{
  "eslint.enable": true,

  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "frameworks/cocos2d-x/**": true,
    "frameworks/runtime-src/**": true,
    "src/app.*": true
  },

  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "frameworks/cocos2d-x/**": true,
    "frameworks/runtime-src/**": true,
    "src/app.*": true,
    "publish/**": true
  }
}

// jsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "amd"
  }
}
```

## 配置静态检测模块 [Eslint](http://eslint.org/)
```bash
npm i -D eslint
npm i -D eslint-config-airbnb
npm i -D babel-eslint
npm i -D eslint-plugin-react
```
创建'.eslintrc'
```json
// id-length: 默认变量命名不能小于一个字符
// no-console: 默认不能使用console方法

// "globals" 指定全局对象
{
  "extends": "eslint-config-airbnb",

  "rules": {
    "id-length": [2, {"properties": "never", "exceptions": ["x", "y", "_", "$", "s", "e"]}],
    "no-console": 0
  },

  "globals": {
    "cc": true
  },

  "env": {
    "browser": true
  }
}
```

## 安装依赖模块 [Babel](http://babeljs.io)
```bash
npm i -D babel babel-loader babel-runtime webpack
npm i -g webpack
npm i -g webpack-dev-server
```

## 配置 [Webpack](https://webpack.github.io/)
```js
// webpack.config.babel.js
import webpack from 'webpack';

const config = {
  entry: __dirname + '/lib/app.js',

  output: {
    path: __dirname + '/src',
    filename: 'app.js',
  },

  devtool: '#source-map',

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=1&optional=runtime' },
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
        semicolons: true,
      },
      sourceMap: true,
    }),
  ],
};

export default config;
```

## 编译
手动编译
```bash
webpack --progress --colors --watch
webpack -p // 发布
webpack -w // 监控
webpack -d // sourcemap
```
开发阶段自动编译
```bash
webpack-dev-server --progress --colors
```
http://localhost:8080/webpack-dev-server/

## 自动化脚本
```bash
npm i -g gulp
npm i -D gulp
```
```bash
npm build:web
```