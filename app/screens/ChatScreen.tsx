import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ChatMessage from "../components/ChatMessage";
import MessageInput from "../components/MessageInput";
import { useChatStore } from "../store/chatStore";

const ChatScreen = () => {
    const { messages, fetchMessages } = useChatStore();

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item, index }) => (
                    <ChatMessage
                        message={item}
                        isGrouped={index > 0 && item.authorUuid === messages[index - 1]?.authorUuid}
                    />
                )}
            />
            <MessageInput />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
});

export default ChatScreen;
