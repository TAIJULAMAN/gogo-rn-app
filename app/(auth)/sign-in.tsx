
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();

    const handleSignIn = async () => {
        setLoading(true);
        setTimeout(async () => {
            await signIn('user');
            setLoading(false);
            router.replace('/(user)/user');
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Let's Sign You In</Text>
                <Text style={styles.subtitle}>Welcome back, you've been missed!</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email or Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="user@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => router.push('/(auth)/forgot-password')}
                >
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button
                    title="Sign In"
                    onPress={handleSignIn}
                    style={{ marginTop: 24 }}
                    loading={loading}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                        <Text style={styles.linkText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
        color: Colors.primaryDark,
    },
    forgotPasswordText: {
        color: '#666',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        color: '#666',
        fontSize: 15,
    },
    linkText: {
        color: Colors.primaryDark,
        fontWeight: '700',
        fontSize: 15,
    },
});
