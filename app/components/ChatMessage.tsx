import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import theme from "../theme";
import { TMessage } from "../types/message";

interface ChatMessageProps {
    message: TMessage;
    isGrouped: boolean;
    findReplyMessage: (uuid: string) => TMessage | undefined; // Function to fetch reply message details
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isGrouped, findReplyMessage }) => {
    const openImagePreview = (url: string) => {
        console.log("Open image preview:", url);
    };

    const openReactions = () => {
        console.log("Open reactions for message:", message.uuid);
    };

    const openUserDetails = () => {
        console.log("Open user details for user:", message.authorUuid);
    };

    const replyToMessage = message.replyToMessageUuid ? findReplyMessage(message.replyToMessageUuid) : null;

    return (
        <View style={[styles.container, isGrouped && styles.grouped]}>
            {!isGrouped && (
                <View style={styles.header}>
                    <TouchableOpacity onPress={openUserDetails}>
                        <Image
                            source={{ uri: `https://api.adorable.io/avatars/40/${message.authorUuid}.png` }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.author}>{message.authorUuid}</Text>
                        <Text style={styles.timestamp}>
                            {new Date(message.sentAt).toLocaleTimeString()}
                        </Text>
                    </View>
                </View>
            )}
            {replyToMessage && (
                <View style={styles.replyContainer}>
                    <Text style={styles.replyAuthor}>{replyToMessage.authorUuid}</Text>
                    <Text style={styles.replyText}>{replyToMessage.text}</Text>
                </View>
            )}
            <Text style={styles.text}>
                {message.text} {message.updatedAt > message.sentAt && <Text style={styles.editedText}>(edited)</Text>}
            </Text>
            {message.attachments.map((attachment) => (
                attachment.type === "image" && (
                    <TouchableOpacity key={attachment.uuid} onPress={() => openImagePreview(attachment.url)}>
                        <Image source={{ uri: attachment.url }} style={styles.image} />
                    </TouchableOpacity>
                )
            ))}
            {message.reactions.length > 0 && (
                <FlatList
                    data={message.reactions}
                    horizontal
                    keyExtractor={(reaction) => reaction.uuid}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.reaction} onPress={openReactions}>
                            <Text>{item.value}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.sm,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.medium,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    grouped: {
        marginTop: -theme.spacing.xs,
        marginLeft: theme.spacing.lg,
        backgroundColor: theme.colors.secondary,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.xs,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: theme.spacing.sm,
    },
    author: {
        fontWeight: "bold",
        fontSize: theme.fontSizes.medium,
        color: theme.colors.text,
    },
    timestamp: {
        fontSize: theme.fontSizes.small,
        color: theme.colors.secondary,
    },
    replyContainer: {
        borderLeftWidth: 2,
        borderLeftColor: theme.colors.primary,
        paddingLeft: theme.spacing.sm,
        marginBottom: theme.spacing.xs,
    },
    replyAuthor: {
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    replyText: {
        fontSize: theme.fontSizes.small,
        color: theme.colors.secondary,
    },
    text: {
        fontSize: theme.fontSizes.medium,
        color: theme.colors.text,
    },
    editedText: {
        fontSize: theme.fontSizes.small,
        color: theme.colors.secondary,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: theme.borderRadius.medium,
        marginTop: theme.spacing.sm,
    },
    reaction: {
        marginRight: theme.spacing.xs,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.small,
        padding: theme.spacing.xs,
    },
});

export default ChatMessage;
