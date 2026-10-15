import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import Screen from '../components/Screen'
import Header from '../components/Header'
import { Field, PrimaryButton, Subtitle, Title, ui } from '../components/UI'
import type { ScreenProps } from '../App'

export default function ForgotPasswordScreen({
	navigation,
}: ScreenProps<'ForgotPassword'>) {
	const [phone, setPhone] = useState('+7 (700) 555 77 55')

	return (
		<Screen>
			<Header />
			<View style={ui.centerBlock}>
				<Title center>Восстановление пароля</Title>
				<Subtitle center style={{ paddingHorizontal: 10 }}>
					Введите свой номер телефона, чтобы восстановить пароль
				</Subtitle>
				<View style={{ height: 24, alignSelf: 'stretch' }} />
				<Field
					icon='call'
					keyboardType='phone-pad'
					value={phone}
					onChangeText={setPhone}
					style={{ alignSelf: 'stretch', marginBottom: 14 }}
				/>
				<PrimaryButton
					title='Продолжить'
					style={{ alignSelf: 'stretch' }}
					onPress={() =>
						phone
							? navigation.navigate('VerifyCode', { phone })
							: Alert.alert('Введите номер телефона')
					}
				/>
			</View>
		</Screen>
	)
}
