import { tamaguiPlugin } from '@tamagui/vite-plugin'
import { one } from 'one/vite'
import type { UserConfig } from 'vite'

export default {
  plugins: [
    one({
      web: {
        defaultRenderMode: 'ssg',
      },
    }),

    tamaguiPlugin({
      config: './tamagui.config.ts',
      components: ['tamagui'],
    }),
  ],

  ssr: {
    noExternal: true,
  },

  optimizeDeps: {
    include: [
      '@tamagui/core',
      '@tamagui/config',
    ],
  },

  build: {
    cssTarget: 'safari15',
  },
} satisfies UserConfig