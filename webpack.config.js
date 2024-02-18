const path = require('path');
const { handlePublicJs } = require('./webpack-entry');
const readlineFile = require('./readlineFile');

module.exports = async () => {
    const handlePath = await readlineFile();
    
    console.log('----- 开始执行压缩public文件夹中js文件~ -----');

    const entry = {...handlePublicJs(handlePath)};
    console.log(entry);

    return {
        mode: 'production',
        entry,
        output: {
            filename: '[name].js',
            // chunkFilename: '[name].js',
            // 输出目录
            path: path.resolve(__dirname, './dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                            ],
                        }
                    }
                },
            ],
        },
    };
}