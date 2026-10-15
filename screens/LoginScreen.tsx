import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import Screen from '../components/Screen'
import Header from '../components/Header'
import {
	Field,
	LinkText,
	PrimaryButton,
	Subtitle,
	Title,
	colors,
} from '../components/UI'
import type { ScreenProps } from '../App'

export default function LoginScreen({ navigation }: ScreenProps<'Login'>) {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')

	const login = () => {
		if (!phone || !password)
			return Alert.alert('Enter your phone number and password')
		navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
	}

	return (
		<Screen>
			<Header
				onBack={() =>
					Alert.alert(
						'This is the first screen',
						'There is nowhere to go back to',
					)
				}
			/>
			<Title>Welcome back!</Title>
			<Subtitle>Log in to your account.</Subtitle>
			<View style={{ height: 22 }} />
			<Field
				icon='call'
				placeholder='Phone number'
				keyboardType='phone-pad'
				value={phone}
				onChangeText={setPhone}
				style={{ marginBottom: 14 }}
			/>
			<Field
				icon='lock-closed'
				secure
				placeholder='Password'
				value={password}
				onChangeText={setPassword}
			/>
			<View style={{ alignItems: 'flex-end', marginTop: 10, marginBottom: 14 }}>
				<LinkText onPress={() => navigation.navigate('ForgotPassword')}>
					Forgot password?
				</LinkText>
			</View>
			<PrimaryButton title='Log in' onPress={login} />
			<Text
				style={{
					textAlign: 'center',
					marginTop: 20,
					fontSize: 12,
					color: colors.muted,
				}}
			>
				Don't have an account?{'\n'}
				<LinkText onPress={() => navigation.navigate('RegisterEmpty')}>
					Sign up
				</LinkText>
			</Text>
		</Screen>
	)
}
