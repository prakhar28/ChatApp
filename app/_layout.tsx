import React from "react";
import { Stack } from "expo-router";
import { View, StyleSheet, SafeAreaView } from "react-native";
import theme from "./theme";

export default function Layout() {
    return (
        <SafeAreaView style={styles.container}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: theme.colors.background,
                    },
                    headerTintColor: theme.colors.background,
                    contentStyle: {
                        backgroundColor: theme.colors.background,
                    },
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});
