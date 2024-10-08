import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="login"  options={{headerShown: false }}/>
            <Stack.Screen name="signup"  options={{headerShown: false }}/>
        </Stack>
    )
}