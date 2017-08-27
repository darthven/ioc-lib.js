import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import uglify from 'rollup-plugin-uglify-es';

export default {
    entry: './src/index.ts',
    dest: 'index.js',
    format: 'cjs',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            preferBuiltins: true
        }),
        typescript(require('typescript')),
        commonjs({
            extensions: ['.js', '.ts']
        }),
        builtins(),
        uglify({
            mangle: true,
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
        }),
    ]
}