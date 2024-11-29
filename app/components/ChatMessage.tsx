import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";
import { TMessage } from "../types/message";

interface ChatMessageProps {
    message: TMessage;
    isGrouped: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isGrouped }) => {
    return (
        <View style={[styles.container, isGrouped && styles.grouped]}>
            {!isGrouped && <Text style={styles.author}>{message.authorUuid}</Text>}
            <Text style={styles.text}>{message.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.sm,
    },
    grouped: {
        marginTop: -theme.spacing.xs,
    },
    author: {
        fontWeight: "bold",
        marginBottom: theme.spacing.xs,
    },
    text: {
        fontSize: theme.fontSizes.medium,
    },
});

export default ChatMessage;
