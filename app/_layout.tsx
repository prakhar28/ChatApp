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
                    headerTintColor: theme.colors.background, // Header text color
                    contentStyle: {
                        backgroundColor: theme.colors.background, // Screen background color
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
