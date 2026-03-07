import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { useOAuth } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function AuthModal({
    setModalVisible,
}: {
    setModalVisible: (modal: boolean) => void;
}) {
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
    const { startOAuthFlow: githubAuth } = useOAuth({ strategy: "oauth_github" });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });

    const onSelectAuth = useCallback(async (strategy: "google" | "github" | "apple") => {
        try {
            const startOAuthFlow = strategy === "google" ? googleAuth : strategy === "github" ? githubAuth : appleAuth;

            const { createdSessionId, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL("/(tabs)", { scheme: "becodemy" }),
            });

            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                setModalVisible(false);
                router.push("/(tabs)");
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, [googleAuth, githubAuth, appleAuth]);

    return (
        <BlurView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Pressable
                style={{
                    width: windowWidth(420),
                    height: windowHeight(250),
                    marginHorizontal: windowWidth(50),
                    backgroundColor: "#fff",
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: fontSizes.FONT35,
                        fontFamily: "Poppins_700Bold",
                    }}
                >
                    Join to Becodemy
                </Text>
                <Text
                    style={{
                        fontSize: fontSizes.FONT17,
                        paddingTop: windowHeight(5),
                        fontFamily: "Poppins_300Light",
                    }}
                >
                    It's easier than your imagination!
                </Text>
                <View
                    style={{
                        paddingVertical: windowHeight(10),
                        flexDirection: "row",
                        gap: windowWidth(20),
                    }}
                >
                    <Pressable onPress={() => onSelectAuth("google")}>
                        <Image
                            source={require("@/assets/images/onboarding/google.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowHeight(40),
                                resizeMode: "contain",
                            }}
                        />
                    </Pressable>
                    <Pressable onPress={() => onSelectAuth("github")}>
                        <Image
                            source={require("@/assets/images/onboarding/github.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowHeight(40),
                                resizeMode: "contain",
                            }}
                        />
                    </Pressable>
                    <Pressable onPress={() => onSelectAuth("apple")}>
                        <Image
                            source={require("@/assets/images/onboarding/apple.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowHeight(40),
                                resizeMode: "contain",
                            }}
                        />
                    </Pressable>
                </View>
            </Pressable>
        </BlurView>
    );
}