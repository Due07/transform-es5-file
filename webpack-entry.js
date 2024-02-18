/* eslint-disable */
const path = require('path');
const fs = require('fs');

let publicPath = path.join(__dirname);

const jsTest = /.js$/;

/**
 * @param {*} mainPath 主路径
 * @param {*} fileName 文件名
 * @returns js 路径数组
 */
const outputFile = (mainPath, fileName) => {
    let entry = {};
    const completePath = path.join(mainPath, fileName);
    const fileStat = fs.statSync(completePath);
    // 文件夹
    if (fileStat.isDirectory()) {
        const itemFileArr = fs.readdirSync(completePath);

        entry = itemFileArr.reduce((pre, cur) => {
            const arr = outputFile(completePath, cur);
            return pre ? {...pre, ...arr} : {...arr};
        }, '');
    } else if (fileStat.isFile()) {
        // js 文件
        if (jsTest.test(fileName)) {
            const key = completePath.replace(publicPath, '').replace('.js', '').replace(/\\/g, '/');
            entry[key] = completePath.replace(__dirname, '.').replace(/\\/g, '/');
        }
    }
    // console.log(entry);
    return entry;
};

const handlePublicJs = (handlePath = '') => {
    let entry = {};
    publicPath = path.join(publicPath, handlePath);
    console.log(`----------处理路径目录: ${publicPath} ----------`);

    // const completePath = path.join(publicPath);
    const completePath = publicPath;
    const fileStat = fs.statSync(completePath);
    if (fileStat.isDirectory()) {
        const arr = fs.readdirSync(completePath);

        entry = arr.reduce((pre, cur) => {
            const fileArr = outputFile(
                completePath,
                cur,
            );
            return pre ? {...pre, ...fileArr} : {...fileArr};
        }, '');
    }
    // console.log(entry);
    return entry;
};

exports.handlePublicJs = handlePublicJs;
