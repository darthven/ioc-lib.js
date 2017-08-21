import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';

export default {
    entry: './src/index.ts',
    dest: 'index.js',
    format: 'cjs',
    external: ['lodash', 'util'],
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        typescript(require('typescript')),
        commonjs({
            extensions: ['.js', '.ts']
        }),
        builtins()
    ]
}