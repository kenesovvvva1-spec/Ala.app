import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import LoginScreen from './screens/LoginScreen'
import RegisterEmptyScreen from './screens/RegisterEmptyScreen'
import RegisterFilledScreen from './screens/RegisterFilledScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import VerifyCodeScreen from './screens/VerifyCodeScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import CityScreen from './screens/CityScreen'
import HomeScreen from './screens/HomeScreen'
import EventsScreen from './screens/EventsScreen'
import ProfileScreen from './screens/ProfileScreen'

export type RootStackParamList = {
	Login: undefined
	RegisterEmpty: undefined
	RegisterFilled: { name?: string; phone?: string } | undefined
	ForgotPassword: undefined
	VerifyCode: { phone: string }
	ResetPassword: undefined
	City: undefined
	Home: { city?: string } | undefined
	Events: { city?: string } | undefined
	Profile: { city?: string } | undefined
}

export type ScreenProps<T extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, T>

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='Login'
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name='Login' component={LoginScreen} />
					<Stack.Screen name='RegisterEmpty' component={RegisterEmptyScreen} />
					<Stack.Screen
						name='RegisterFilled'
						component={RegisterFilledScreen}
					/>
					<Stack.Screen
						name='ForgotPassword'
						component={ForgotPasswordScreen}
					/>
					<Stack.Screen name='VerifyCode' component={VerifyCodeScreen} />
					<Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
					<Stack.Screen name='City' component={CityScreen} />
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{ gestureEnabled: false, animation: 'fade' }}
					/>
					<Stack.Screen
						name='Events'
						component={EventsScreen}
						options={{ gestureEnabled: false, animation: 'none' }}
					/>
					<Stack.Screen
						name='Profile'
						component={ProfileScreen}
						options={{ gestureEnabled: false, animation: 'none' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
