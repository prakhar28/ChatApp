import React from "react";
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView} from "react-native";
import { TParticipant } from "../types/participant";
import { Ionicons } from "@expo/vector-icons"; // Install @expo/vector-icons if not already installed

interface ParticipantDetailsProps {
    participant: TParticipant;
    onClose: () => void; // Callback to close or navigate back
}

const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({ participant, onClose }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#007bff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Participant Details</Text>
            </View>

            {/* Participant Details */}
            <ScrollView contentContainerStyle={styles.content}>
                {participant.avatarUrl ? (
                    <Image source={{ uri: participant.avatarUrl }} style={styles.avatar} />
                ) : (
                    <View style={styles.placeholderAvatar} />
                )}
                <Text style={styles.name}>{participant.name}</Text>
                {participant.bio && <Text style={styles.bio}>Bio: {participant.bio}</Text>}
                {participant.email && <Text style={styles.email}>Email: {participant.email}</Text>}
                {participant.jobTitle && <Text style={styles.jobTitle}>Job Title: {participant.jobTitle}</Text>}
                <Text style={styles.timestamp}>
                    Joined: {new Date(participant.createdAt).toLocaleDateString()}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    content: {
        padding: 20,
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    placeholderAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#ccc",
        marginBottom: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    bio: {
        fontSize: 14,
        color: "#6c757d",
        textAlign: "center",
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: "#007bff",
        marginBottom: 5,
    },
    jobTitle: {
        fontSize: 14,
        color: "#28a745",
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 12,
        color: "#6c757d",
        marginTop: 10,
    },
});

export default ParticipantDetails;
