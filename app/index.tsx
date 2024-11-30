import React from "react";
import ChatScreen from "./screens/ChatScreen";
import {SafeAreaView} from "react-native";

export default function Index() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ChatScreen />;
        </SafeAreaView>
    )
}
