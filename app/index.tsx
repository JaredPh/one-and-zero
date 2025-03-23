import { styled, Text, YStack } from 'tamagui';

export default function App() {
  return (
    <YStack
      flex={1}
      gap='$4'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      width='100vw'
      backgroundColor='$background'
    >
      <Text color='$text'>Hello World!</Text>
    </YStack>
  );
}
