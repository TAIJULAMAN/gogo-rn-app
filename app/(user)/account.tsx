import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import GenericScreen from '../../components/GenericScreen';
import { useAuth } from '../../context/AuthContext';

export default function AccountScreen() {
    const { signOut } = useAuth();
    return (
        <View style={{ flex: 1 }}>
            <GenericScreen title="Account" />
            <TouchableOpacity
                style={{ position: 'absolute', bottom: 40, right: 20, backgroundColor: '#FF5252', padding: 15, borderRadius: 30, flexDirection: 'row', alignItems: 'center' }}
                onPress={signOut}
            >
                <Ionicons name="log-out-outline" size={24} color="white" />
                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}
