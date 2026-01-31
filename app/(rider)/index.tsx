import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function RiderHomeScreen() {
    const { signOut } = useAuth();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Rider Dashboard</Text>
                <TouchableOpacity onPress={signOut}>
                    <Ionicons name="log-out-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.statusCard}>
                    <View style={styles.statusIcon}>
                        <Ionicons name="wifi" size={32} color={Colors.primary} />
                    </View>
                    <Text style={styles.statusTitle}>You are online</Text>
                    <Text style={styles.statusSubtitle}>Waiting for new delivery requests...</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    statusCard: {
        alignItems: 'center',
        padding: 40,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        width: '100%',
    },
    statusIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    statusTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    statusSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});
