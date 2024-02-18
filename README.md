# JS代码转化ES5

## 项目说明

* 项目提供两种操作转化方式
  1. 使用webpack 直接转化 es5 + 代码压缩     ---------->      npm run build
     *  webpack 输出为 **dist** 目录下

  2. 使用babel 对操作目录直接进行es5转化     ---------->      npm run babel
     * babel 输出为 **babel-dist** 目录下
     * 如果需要在babel 中使用压缩则将代码中 **minify 代码** 注释解开即可
  
  **tips**: 如果需要代码混淆**建议使用**webpack，因为webpack内置**Terser**


## 操作环境

```
/**
  node: >= v18.18.0
*/
```

## 操作指令

```javascript
/**
  1. npm i
  2. npm run build  /  npm run babel
  3. 输入目标路径 例： ./testFile
*/
```
