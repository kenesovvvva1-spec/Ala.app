import React from 'react'
import Screen from '../components/Screen'
import Header from '../components/Header'
import { RegisterForm } from '../components/UI'
import type { ScreenProps } from '../App'

export default function RegisterEmptyScreen({
	navigation,
}: ScreenProps<'RegisterEmpty'>) {
	return (
		<Screen>
			<Header />
			<RegisterForm
				initial={{ name: '', phone: '', password: '', agree: false }}
				onSubmit={v =>
					navigation.navigate('RegisterFilled', {
						name: v.name,
						phone: v.phone,
					})
				}
				onLogin={() => navigation.navigate('Login')}
			/>
		</Screen>
	)
}
