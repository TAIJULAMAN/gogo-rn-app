
import { Redirect } from 'expo-router';

export default function Index() {
    // If first time -> /splash -> /onboarding
    // If signed in -> /(tabs)
    // Else -> /sign-in

    return <Redirect href="/splash" />;
}
