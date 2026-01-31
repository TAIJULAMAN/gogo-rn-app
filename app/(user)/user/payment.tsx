import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Checkout', 'Payment'];

const PAYMENT_METHODS = [
    { id: 'wallet', name: 'Wallet', balance: '$240.50', icon: 'wallet-outline', type: 'ionicon' },
    { id: 'cash', name: 'Cash', balance: null, icon: 'cash-outline', type: 'ionicon' },
    { id: 'card', name: 'mastercard', balance: '**** 5678', icon: 'payment', type: 'material' },
];

export default function PaymentScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(3);
    const [selectedMethod, setSelectedMethod] = useState('wallet');

    const renderStepper = () => (
        <View style={styles.stepperContainer}>
            {STEPS.map((step, index) => (
                <React.Fragment key={index}>
                    <View style={styles.stepItem}>
                        <View style={[
                            styles.stepCircle,
                            index <= currentStep ? styles.stepActive : styles.stepInactive
                        ]}>
                            <Text style={styles.stepNumber}>{index + 1}</Text>
                        </View>
                        <Text style={[
                            styles.stepLabel,
                            index <= currentStep ? styles.stepLabelActive : styles.stepLabelInactive
                        ]}>{step}</Text>
                    </View>
                    {index < STEPS.length - 1 && (
                        <View style={styles.stepLineContainer} />
                    )}
                </React.Fragment>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PAYMENT</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.card}>
                {renderStepper()}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>



                    {/* Payment Methods */}
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.methodsContainer}>
                        {PAYMENT_METHODS.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.methodCard,
                                    selectedMethod === method.id && styles.methodCardSelected
                                ]}
                                onPress={() => setSelectedMethod(method.id)}
                            >
                                <View style={styles.methodIcon}>
                                    {method.type === 'ionicon' ? (
                                        <Ionicons name={method.icon as any} size={24} color={Colors.primary} />
                                    ) : (
                                        <MaterialIcons name={method.icon as any} size={24} color={Colors.primary} />
                                    )}
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodName}>{method.name}</Text>
                                    {method.balance && <Text style={styles.methodBalance}>{method.balance}</Text>}
                                </View>
                                <View style={styles.radioContainer}>
                                    {selectedMethod === method.id ? (
                                        <Ionicons name="radio-button-on" size={24} color={Colors.primary} />
                                    ) : (
                                        <Ionicons name="radio-button-off" size={24} color="#DDD" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Promo Code */}
                    <View style={styles.promoContainer}>
                        <View style={styles.promoIcon}>
                            <Ionicons name="pricetag-outline" size={20} color="#666" />
                        </View>
                        <Text style={styles.promoText}>Add Promo Code</Text>
                    </View>

                    {/* Total */}
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>$39.82</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.payButton, { backgroundColor: '#BEFFB6' }]}
                        onPress={() => router.push('/(user)/user/payment-success')}
                    >
                        <Text style={styles.payButtonText}>Pay Now</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#2C3E50',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        paddingHorizontal: 0,
    },
    stepItem: {
        alignItems: 'center',
        zIndex: 1,
        flex: 1,
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    stepActive: {
        backgroundColor: Colors.primary,
    },
    stepInactive: {
        backgroundColor: '#E0E0E0',
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    stepLabel: {
        fontSize: 10,
        color: '#999',
        fontWeight: '500',
        textAlign: 'center',
    },
    stepLabelActive: {
        color: '#333',
        fontWeight: '700',
    },
    stepLabelInactive: {
        color: '#999',
    },
    stepLineContainer: {
        flex: 1,
        marginHorizontal: 0,
        marginTop: 14,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        height: 1,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 12,
        marginTop: 8,
    },

    // Summary Card
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 16,
        marginBottom: 24,
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleImage: {
        width: 60,
        height: 40,
        marginRight: 12,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    vehicleDetails: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
    },
    routeRow: {
        gap: 8,
    },
    routePoint: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    dotGreen: {
        backgroundColor: '#00E676',
    },
    dotRed: {
        backgroundColor: '#FF3D00',
    },
    routeText: {
        fontSize: 12,
        color: '#666',
        flex: 1,
    },
    routeLine: {
        width: 1,
        height: 10,
        backgroundColor: '#DDD',
        marginLeft: 3.5,
    },

    // Payment Methods
    methodsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#fff',
    },
    methodCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#F0FFF4',
    },
    methodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    methodInfo: {
        flex: 1,
    },
    methodName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    methodBalance: {
        fontSize: 12,
        color: '#666',
    },
    radioContainer: {
        marginLeft: 8,
    },

    // Promo
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        marginBottom: 24,
    },
    promoIcon: {
        marginRight: 12,
    },
    promoText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },

    // Total
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 16,
        color: '#666',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#333',
    },

    payButton: {
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    payButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
