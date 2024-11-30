import React, { useEffect } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useChatStore } from "../store/chatStore";
import { useParticipantStore } from "@/app/store/participantStore";
import ChatMessage from "../components/ChatMessage";
import MessageInput from "@/app/components/MessageInput";

const ChatScreen = () => {
    const { messages, fetchMessages, fetchOlderMessages, loading, hasMore } = useChatStore();
    const { fetchParticipants } = useParticipantStore();

    useEffect(() => {
        // Fetch initial data
        fetchMessages();
        fetchParticipants();
    }, []);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            fetchOlderMessages(); // Fetch older messages when user scrolls up
        }
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="small" color="#007bff" />
                <Text>Loading...</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined} // Adjusts layout for iOS
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Offset for status/navigation bar
        >
            <FlatList
                data={messages}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item, index }) => (
                    <ChatMessage
                        message={item}
                        isGrouped={
                            index > 0 &&
                            item.authorUuid === messages[index - 1]?.authorUuid &&
                            new Date(item.sentAt).toDateString() ===
                            new Date(messages[index - 1]?.sentAt).toDateString()
                        }
                    />
                )}
                inverted // Latest messages at the bottom
                onEndReached={handleLoadMore} // Trigger pagination when scrolling up
                onEndReachedThreshold={0.1} // Trigger when 10% of the list is scrolled
                ListFooterComponent={renderFooter} // Render footer properly
            />
            <MessageInput />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loading: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ChatScreen;
