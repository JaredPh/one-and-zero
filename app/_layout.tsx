import { Slot } from 'one';
import { TamaguiProvider, Theme } from 'tamagui';
import { useColorScheme } from 'react-native';

import config from '../tamagui.config';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme}>
        <Slot />
      </Theme>
    </TamaguiProvider>
  );
}
