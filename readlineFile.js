const readline = require('readline/promises');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


module.exports = () => {
    return new Promise((resolve, reject) => {
        rl.question('请输入 处理文件路径 以当前根目录(./)开头: ').then(res => {
            rl.close();
            resolve(res);
        }).catch((rej) => reject(rej))
    });
};