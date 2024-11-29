import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import ChatMessage from "../components/ChatMessage";
import MessageInput from "../components/MessageInput";
import { useChatStore } from "../store/chatStore";
import { TMessage } from "../types/message";

const ChatScreen = () => {
    const { messages, fetchMessages } = useChatStore();

    useEffect(() => {
        fetchMessages();
    }, []);

    const findReplyMessage = (uuid: string): TMessage | undefined => {
        return messages.find((message) => message.uuid === uuid);
    };

    const renderSeparator = (date: string) => (
        <View style={styles.dateSeparator}>
            <Text style={styles.dateText}>{date}</Text>
        </View>
    );

    const renderMessage = ({ item, index }: any) => {
        const isGrouped =
            index > 0 &&
            item.authorUuid === messages[index - 1]?.authorUuid &&
            new Date(item.sentAt).toDateString() === new Date(messages[index - 1].sentAt).toDateString();

        const showDateSeparator =
            index === 0 ||
            new Date(item.sentAt).toDateString() !==
            new Date(messages[index - 1]?.sentAt).toDateString();

        return (
            <>
                {showDateSeparator && renderSeparator(new Date(item.sentAt).toDateString())}
                <ChatMessage message={item} isGrouped={isGrouped} findReplyMessage={findReplyMessage} />
            </>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.uuid}
                renderItem={renderMessage}
                initialNumToRender={10}
                getItemLayout={(data, index) => ({
                    length: 100,
                    offset: 100 * index,
                    index,
                })}
            />
            <MessageInput />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
    dateSeparator: {
        alignItems: "center",
        marginVertical: 10,
    },
    dateText: {
        backgroundColor: "#e9ecef",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 12,
        color: "#6c757d",
    },
});

export default ChatScreen;
