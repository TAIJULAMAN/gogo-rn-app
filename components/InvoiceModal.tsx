
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

interface InvoiceModalProps {
    visible: boolean;
    onClose: () => void;
    order: any;
}

export default function InvoiceModal({ visible, onClose, order }: InvoiceModalProps) {
    if (!visible) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    entering={ZoomIn.duration(300)}
                    style={styles.modalContainer}
                >
                    <View style={styles.invoiceCard}>
                        {/* Build Header */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Ionicons name="cube" size={24} color={Colors.primary} />
                                <Text style={styles.logoText}>GOGO</Text>
                            </View>
                            <Text style={styles.invoiceTitle}>INVOICE</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Order Info */}
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>Order ID</Text>
                                <Text style={styles.value}>{order.orderId}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.label}>Date</Text>
                                <Text style={styles.value}>{order.date}</Text>
                            </View>
                        </View>

                        <View style={styles.spacer} />

                        {/* Customer Info (Mocked if not in order object) */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Billed To</Text>
                            <Text style={styles.customerName}>John Doe</Text>
                            <Text style={styles.customerInfo}>{order.to}</Text>
                            <Text style={styles.customerInfo}>{order.toDetails}</Text>
                        </View>

                        <View style={styles.spacer} />

                        {/* Items / Breakdown */}
                        <View style={styles.itemsContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Description</Text>
                                <Text style={styles.tableHeaderText}>Amount</Text>
                            </View>

                            {order.breakdown.map((item: any, index: number) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableText, { flex: 1 }]}>
                                        {item.label}
                                    </Text>
                                    <Text style={styles.tableText}>{item.amount}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.divider} />

                        {/* Total */}
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalAmount}>{order.price}</Text>
                        </View>

                        <View style={styles.spacer} />

                        {/* Actions */}
                        <TouchableOpacity style={styles.downloadButton} >
                            <Ionicons name="download-outline" size={20} color="#fff" />
                            <Text style={styles.downloadText}>Download PDF</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 400,
    },
    invoiceCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
        letterSpacing: 1,
    },
    invoiceTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    spacer: {
        height: 24,
    },
    section: {},
    sectionTitle: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    customerName: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    customerInfo: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    itemsContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        padding: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 8,
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#999',
        textTransform: 'uppercase',
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    tableText: {
        fontSize: 14,
        color: Colors.text,
        fontWeight: '500',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.primaryDark,
    },
    downloadButton: {
        backgroundColor: Colors.text,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
        marginBottom: 12,
    },
    downloadText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    closeButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    closeText: {
        color: '#999',
        fontSize: 16,
        fontWeight: '600',
    },
});
