import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import Screen from '../components/Screen'
import Header from '../components/Header'
import { Field, PrimaryButton, Subtitle, Title, ui } from '../components/UI'
import type { ScreenProps } from '../App'

export default function ResetPasswordScreen({
	navigation,
}: ScreenProps<'ResetPassword'>) {
	const [p1, setP1] = useState('')
	const [p2, setP2] = useState('')

	const submit = () => {
		if (p1.length < 8)
			return Alert.alert('Password must be at least 8 characters')
		if (!/[A-Z]/.test(p1) || !/[a-z]/.test(p1))
			return Alert.alert('Use both uppercase and lowercase letters')
		if (p1 !== p2) return Alert.alert('Passwords do not match')
		Alert.alert(
			'Done',
			'Your password has been changed. Log in with the new password.',
		)
		navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
	}

	return (
		<Screen>
			<Header />
			<View style={ui.centerBlock}>
				<Title center>Reset password</Title>
				<Subtitle center>
					At least 8 characters, with{'\n'}uppercase and lowercase letters
				</Subtitle>
				<View style={{ height: 24 }} />
				<Field
					icon='lock-closed'
					secure
					placeholder='Password'
					value={p1}
					onChangeText={setP1}
					style={{ alignSelf: 'stretch', marginBottom: 14 }}
				/>
				<Field
					icon='lock-closed'
					secure
					placeholder='Repeat password'
					value={p2}
					onChangeText={setP2}
					style={{ alignSelf: 'stretch', marginBottom: 14 }}
				/>
				<PrimaryButton
					title='Continue'
					style={{ alignSelf: 'stretch' }}
					onPress={submit}
				/>
			</View>
		</Screen>
	)
}
