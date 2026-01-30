import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Payment'];

export default function CreateOrderScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

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
                <Text style={styles.headerTitle}>CREATE ORDER</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.card}>
                {renderStepper()}

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionTitle}>Delivery location</Text>
                    <Text style={styles.sectionSubtitle}>Choose where to pick up &amp; Drop</Text>

                    {/* Location Inputs */}
                    <View style={styles.locationContainer}>
                        {/* Timeline Line */}
                        <View style={styles.timelineContainer}>
                            <View style={[styles.timelineDot, styles.dotGreen]}>
                                <Text style={styles.dotText}>A</Text>
                            </View>
                            <View style={styles.timelineLine} />
                            <View style={[styles.timelineDot, styles.dotRed]}>
                                <Text style={styles.dotText}>B</Text>
                            </View>
                        </View>

                        {/* Input Fields */}
                        <View style={styles.inputsWrapper}>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Sports City, Dubai"
                                    value={pickup}
                                    onChangeText={setPickup}
                                    placeholderTextColor="#333"
                                />
                                <TouchableOpacity style={styles.targetIcon}>
                                    <MaterialIcons name="my-location" size={20} color="#999" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 12 }} />

                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Type to search or paste location link"
                                    value={dropoff}

                                    onChangeText={setDropoff}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity style={styles.targetIcon}>
                                    <MaterialIcons name="my-location" size={20} color="#999" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Saved Addresses */}
                    <TouchableOpacity style={styles.savedAddressesButton}>
                        <Text style={styles.savedAddressesText}>Saved Addresses</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" />
                    </TouchableOpacity>

                    {/* Recent Drops */}
                    <View style={styles.recentDropsContainer}>
                        <Text style={styles.recentDropsTitle}>Recent Drops</Text>

                        <TouchableOpacity style={styles.recentDropItem}>
                            <Text style={styles.recentDropName}>Jasani LLC</Text>
                            <Text style={styles.recentDropAddress}>305, 3rd Floor, Building 3, Bay Square, Business Bay</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.recentDropItem}>
                            <Text style={styles.recentDropName}>Rashed Al Shamsi Advertising</Text>
                            <Text style={styles.recentDropAddress}>Behind Haneefa Supermarket, Diera,</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Add bottom padding for scroll content */}
                    <View style={{ height: 20 }} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary, // Green background
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
        marginBottom: 30,
        paddingHorizontal: 0,
    },
    stepItem: {
        alignItems: 'center',
        zIndex: 1,
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
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
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
        height: 2,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
        marginTop: 14, // Roughly center of 30px circle
    },

    // Form Styling
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20,
    },
    locationContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineContainer: {
        alignItems: 'center',
        marginRight: 12,
        paddingTop: 12,
    },
    timelineDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#fff',
    },
    dotGreen: {
        borderColor: '#4CAF50', // Pickup green
    },
    dotRed: {
        borderColor: '#F44336', // Dropoff red
    },
    dotText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    timelineLine: {
        width: 1,
        height: 40,
        backgroundColor: '#000',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 1,
        marginVertical: 4,
    },
    inputsWrapper: {
        flex: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: '#333',
    },
    targetIcon: {
        padding: 4,
    },

    // Saved Addresses
    savedAddressesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
        marginBottom: 20,
    },
    savedAddressesText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
    },

    // Recent Drops
    recentDropsContainer: {
        marginBottom: 20,
    },
    recentDropsTitle: {
        fontSize: 14,
        color: '#999',
        fontWeight: '600',
        marginBottom: 12,
    },
    recentDropItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    recentDropName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    recentDropAddress: {
        fontSize: 13,
        color: '#7f8c8d',
    },
});
