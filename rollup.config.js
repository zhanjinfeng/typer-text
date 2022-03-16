import * as path from 'path';
import { cleandir } from 'rollup-plugin-cleandir';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

import * as pkg from './package.json';

const outDir = path.join(__dirname, './dist/lib');

//配置规则
export default {
    //入口文件
    input: path.join(__dirname, 'src/index.ts'),
    //输出文件
    output: [
        //输出CommonJS规范的代码
        { format: 'cjs', name: pkg.name, file: path.join(outDir, 'index.cjs.js') },
        //输出ESM规范的代码
        { format: 'esm', name: pkg.name, file: path.join(outDir, 'index.js') },
        // iife
        { format: 'iife', name: pkg.name, file: path.join(outDir, 'index.browser.js'), extend: true },
    ],
    //配置插件
    plugins: [
        //自动读取tsconfig.json
        typescript(),
        //自动清除文件夹
        cleandir(outDir),
        //配置Rollup支持CommonJS规范用以识别CommonJS规范的依赖
        commonjs(),
        //解析node_modules中CommonJS规范的第三方模块
        nodeResolve({ customResolveOptions: { moduleDirectory: 'node_modules' } }),
        uglify(),
    ],
};
