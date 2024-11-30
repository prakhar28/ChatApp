import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from "react-native";
import { TMessage } from "../types/message";
import { useParticipantStore } from "../store/participantStore";
import ParticipantDetails from "./ParticipantDetails";

interface ChatMessageProps {
    message: TMessage;
    isGrouped: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isGrouped }) => {
    const [isParticipantModalVisible, setParticipantModalVisible] = useState(false);
    const [isReactionModalVisible, setReactionModalVisible] = useState(false);

    const { getParticipant } = useParticipantStore();
    const participant = getParticipant(message.authorUuid);
    const openUserDetails = () => {
        setParticipantModalVisible(true);
    };

    const closeUserDetails = () => {
        setParticipantModalVisible(false);
    };

    const openReactions = () => {
        setReactionModalVisible(true);
    };

    const closeReactions = () => {
        setReactionModalVisible(false);
    };

    return (
        <View style={[styles.container, isGrouped && styles.grouped]}>
            {!isGrouped && participant && (
                <TouchableOpacity onPress={openUserDetails}>
                    <View style={styles.header}>
                        <Image source={{ uri: participant.avatarUrl }} style={styles.avatar} />
                        <Text style={styles.author}>{participant.name}</Text>
                    </View>
                </TouchableOpacity>
            )}

            <Text style={styles.text}>{message.text}</Text>

            {message.attachments.map((attachment) => (
                attachment.type === "image" && (
                    <Image key={attachment.uuid} source={{ uri: attachment.url }} style={styles.image} />
                )
            ))}

            {message.reactions.length > 0 && (
                <View style={styles.reactionsContainer}>
                    <TouchableOpacity onPress={openReactions}>
                        <Text style={styles.reactionsText}>
                            {message.reactions.map((reaction) => reaction.value).join(" ")}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal visible={isParticipantModalVisible} animationType="slide" onRequestClose={closeUserDetails}>
                {participant && <ParticipantDetails participant={participant} onClose={closeUserDetails} />}
            </Modal>

            <Modal visible={isReactionModalVisible} animationType="slide" onRequestClose={closeReactions}>
                <View style={styles.reactionModal}>
                    <Text style={styles.modalTitle}>Reactions</Text>
                    <FlatList
                        data={message.reactions}
                        keyExtractor={(item) => item.uuid}
                        renderItem={({ item }) => (
                            <View style={styles.reactionItem}>
                                <Text style={styles.reactionEmoji}>{item.value}</Text>
                                <Text style={styles.reactionAuthor}>
                                    {getParticipant(item.participantUuid)?.name || "Unknown"}
                                </Text>
                            </View>
                        )}
                        removeClippedSubviews={true}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={closeReactions}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10, marginBottom: 10, backgroundColor: "#f5f5f5", borderRadius: 5 },
    grouped: { marginTop: -5 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    author: { fontWeight: "bold", fontSize: 16 },
    text: { fontSize: 14, marginBottom: 5 },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginTop: 10,
    },
    reactionsContainer: { marginTop: 10, flexDirection: "row" },
    reactionsText: { fontSize: 14, color: "#007bff" },

    reactionModal: { flex: 1, padding: 20, backgroundColor: "#fff" },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    reactionItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    reactionEmoji: { fontSize: 20, marginRight: 10 },
    reactionAuthor: { fontSize: 14, color: "#333" },
    closeButton: {
        marginTop: 20,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#007bff",
        borderRadius: 5,
    },
    closeButtonText: { color: "#fff", fontWeight: "bold" },
});

export default ChatMessage;
