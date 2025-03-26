import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type PropsWithChildren, useState } from "react";
import {
  Button,
  Form,
  type GetThemeValueForKey,
  Input,
  Label,
  RadioGroup,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { ErrorBoundary } from "react-error-boundary";

import { ToggleThemeButton } from "~/interface/ToggleThemeButton";
import { authClient, useAuth } from "~/better-auth/auth-client";

type Mode = "login" | "register";
const modes: { label: string; value: Mode }[] = [
  { value: "login", label: "Log in" },
  { value: "register", label: "Sign Up" },
];

function SafeArea({ children }: PropsWithChildren<{}>) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <YStack
      t={safeAreaInsets.top}
      b={safeAreaInsets.bottom}
      l={safeAreaInsets.left}
      r={safeAreaInsets.right}
    >
      {children}
    </YStack>
  );
}

function TopBar({ heading }: { heading: string }) {
  return (
    <XStack px="$8" py="$6" gap="$4" justify="space-between" items="center">
      <Text fontSize="$8" fontWeight="bold">
        {heading}
      </Text>

      <ToggleThemeButton />
    </XStack>
  );
}

export default function App() {
  const { token, user, loggedIn, loading, session } = useAuth();

  const [mode, setMode] = useState<Mode>(modes[0].value);
  const [error, setError] = useState<object | null>(null);

  const [email, setEmail] = useState<string>("dev+tu1@jared.ph");
  const [password, setPassword] = useState<string>("Password1!");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (loggedIn) {
      handleSignOut();
    } else if (mode === "login") {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  const handleSignIn = async () => {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setError(error ?? null);
  };

  const handleSignUp = async () => {
    const { error } = await authClient.signUp.email({
      name: "Test User",
      email,
      password,
    });

    setError(error ?? null);
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    setError(error ?? null);
  };

  return (
    <ErrorBoundary
      fallback={<Text>Something went wrong</Text>}
      onError={(error) => {
        // TODO: update this
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log("Error Boundary Details:", error);
      }}
    >
      <YStack fullscreen={true} bg="$background">
        <SafeArea>
          <TopBar heading="Better Auth Playground" />

          <ScrollView>
            <YStack m="$4" gap="$6">
              <YStack gap="$6" borderWidth={1} borderColor="$white10" p="$4">
                <Form>
                  <YStack gap="$4">
                    <Text fontSize="$8" fontWeight="500">
                      Form
                    </Text>

                    {!loggedIn && (
                      <YStack>
                        <RadioGroup
                          value={mode}
                          onValueChange={(value) => setMode(value as Mode)}
                        >
                          <XStack gap="$6" items="center">
                            {modes.map(({ value, label }) => (
                              <XStack
                                key={value}
                                justify="center"
                                items="center"
                                gap="$2"
                              >
                                <RadioGroup.Item value={value} id={value} b={1}>
                                  <RadioGroup.Indicator />
                                </RadioGroup.Item>

                                <Label htmlFor={value}>{label}</Label>
                              </XStack>
                            ))}
                          </XStack>
                        </RadioGroup>
                      </YStack>
                    )}

                    {!loggedIn && (
                      <YStack gap="$3">
                        <YStack gap="$1">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                            autoCorrect={false}
                          />
                        </YStack>

                        <YStack gap="$1">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            keyboardType="default"
                            autoComplete="password"
                            autoCorrect={false}
                            secureTextEntry={true}
                          />
                        </YStack>
                      </YStack>
                    )}

                    <Button onPress={handleSubmit} type="submit">
                      {loggedIn ? "Log out" : "Submit"}
                    </Button>
                  </YStack>
                </Form>

                <Text fontSize="$2" fontWeight="100" lineHeight="$1">
                  {JSON.stringify(
                    {
                      form: { mode, email, password },
                      state: {
                        loggedIn,
                        loading,
                        error,
                      },
                      auth: {
                        session,
                        token: token
                          ? token.split(".").reduce((c, part, index) => {
                              const keys = ["header", "payload", "signature"];
                              const value =
                                index > 1 ? part : JSON.parse(atob(part));
                              return { ...c, [keys[index]]: value };
                            }, {})
                          : null,
                        user,
                      },
                    },
                    null,
                    2
                  )}
                </Text>
              </YStack>

              <Alphabet />
            </YStack>
          </ScrollView>
        </SafeArea>
      </YStack>
    </ErrorBoundary>
  );
}

function Alphabet() {
  return (
    <YStack gap="$6">
      {"abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => (
        <YStack
          key={letter}
          borderWidth={1}
          borderColor={
            ["$red10", "$green10", "$yellow10", "$blue10"][
              index % 4
            ] as GetThemeValueForKey<"borderColor">
          }
          p="$4"
        >
          <Text>
            {letter.toUpperCase()}
            {letter}
          </Text>
        </YStack>
      ))}
    </YStack>
  );
}
