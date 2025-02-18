import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'default',
  },
  plugins: [
    typescript(),
    copy({
      targets: [
        { src: 'resources/model/novel_model.yaml', dest: 'dist/resources/model/' },
      ],
    }),
  ],
  external: ['obsidian', 'fs', 'path'],
};
