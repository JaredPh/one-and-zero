import { createTamagui, createTokens } from 'tamagui';
import { tokens as defaultTokens } from '@tamagui/config/v4';

const tokens = createTokens({
  ...defaultTokens,
  color: {
    black: '#000000',
    white: '#ffffff',
  },
});

const config = createTamagui({
  tokens,
  themes: {
    dark: {
      background: tokens.color.black,
      text: tokens.color.white,
    },
    light: {
      background: tokens.color.white,
      text: tokens.color.black,
    },
  },
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
