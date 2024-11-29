import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import theme from "../theme";
import { useChatStore } from "../store/chatStore";

const MessageInput = () => {
    const [text, setText] = useState("");
    const { sendMessage } = useChatStore();

    const handleSend = async () => {
        if (text.trim()) {
            await sendMessage(text);
            setText("");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Type a message..."
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: theme.spacing.sm,
        borderTopWidth: 1,
        borderColor: theme.colors.border,
    },
    input: {
        flex: 1,
        marginRight: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.small,
        padding: theme.spacing.sm,
    },
});

export default MessageInput;
