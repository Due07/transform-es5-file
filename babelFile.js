const babel =  require('@babel/core');
// const minify = require('babel-minify');
const fs = require('fs');
const path = require('path');

const readlineFile = require('./readlineFile');
const { handlePublicJs } = require('./webpack-entry');

const OUTPUT_PATH = './babel-dist';
/** 没有这个文件夹，创建文件夹 */
if (!fs.existsSync(path.join(__dirname, OUTPUT_PATH))) fs.mkdirSync(path.join(__dirname, OUTPUT_PATH));

readlineFile().then(handlePath => {
    const publicPath = handlePath;
    const entryObj = handlePublicJs(publicPath);

    Object.entries(entryObj).forEach(([key, value]) => {
        babel.transformFileAsync(path.join(__dirname, value), { presets: ['@babel/preset-env'] }).then(res => {

            const outputPath = path.join(__dirname, OUTPUT_PATH, `${key}.js`);
            const ws = fs.createWriteStream(outputPath);

            /** 使用minify 压缩代码 */
            // const result = minify(res.code, { mangle: true });
            // ws.write(result.code);

            ws.write(res.code);
            ws.end();
            ws.on('finish', () => console.warn(`============  ${outputPath} --- OK!  =============`));
        });
    })
});