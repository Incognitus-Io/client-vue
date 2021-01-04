import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';
import stripCode from 'rollup-plugin-strip-code';
import cleanup from 'rollup-plugin-cleanup';
import pkg from './package.json';

const esmOutput = {
  file: 'lib/esm/index.js',
  format: 'es',
  sourcemap: true,
};
const cjsOutput = {
  file: 'lib/cjs/index.js',
  format: 'cjs',
  sourcemap: true,
  exports: 'named',
};

const vue2Stripper = {
  start_comment: 'vue2-start',
  end_comment: 'vue2-end',
};
const vue3Stripper = {
  start_comment: 'vue3-start',
  end_comment: 'vue3-end',
};

export default {
  input: 'src/index.ts',
  output: [
    esmOutput,
    { ...esmOutput, file: 'lib/esm/index.min.js', plugins: [terser()] },
    cjsOutput,
    { ...cjsOutput, file: 'lib/cjs/index.min.js', plugins: [terser()] },
  ],
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
    }),
    stripCode(+pkg.mode === 2 ? vue3Stripper : vue2Stripper),
    stripCode({
      start_comment: 'test-code',
      end_comment: 'end-test-code',
    }),
    cleanup({
      comments: 'none',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: 'tsconfig.json',
    }),
    vue(),
  ],
  external: [
    '@incognitus/client-web-core',
    '@vue/composition-api',
    '@vue/runtime-core',
    'vue',
    'vue-frag',
  ],
};
