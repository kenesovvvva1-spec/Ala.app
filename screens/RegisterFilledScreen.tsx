import React from 'react'
import Screen from '../components/Screen'
import Header from '../components/Header'
import { RegisterForm } from '../components/UI'
import type { ScreenProps } from '../App'

export default function RegisterFilledScreen({
	navigation,
	route,
}: ScreenProps<'RegisterFilled'>) {
	return (
		<Screen>
			<Header />
			<RegisterForm
				initial={{
					name: route.params?.name || 'Almat Kenesov',
					phone: route.params?.phone || '+7 (706) 695 27 08',
					password: '1234567',
					agree: true,
				}}
				onSubmit={() => navigation.navigate('City')}
				onLogin={() => navigation.navigate('Login')}
			/>
		</Screen>
	)
}
