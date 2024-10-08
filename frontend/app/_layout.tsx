import { Stack } from "expo-router"
import store from '../src/redux/Store';
import { Provider } from "react-redux";

const StackLayout = () => {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="(auth)"  options={{headerShown: false }}/>
                <Stack.Screen name="(tabs)"  options={{headerShown: false }}/>
            </Stack>
        </Provider>
    )
}

export default StackLayout;