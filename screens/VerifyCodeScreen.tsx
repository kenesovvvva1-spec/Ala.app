import React, { useRef, useState } from 'react'
import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import Screen from '../components/Screen'
import Header from '../components/Header'
import {
	LinkText,
	PrimaryButton,
	Subtitle,
	Title,
	colors,
	ui,
} from '../components/UI'
import type { ScreenProps } from '../App'

export default function VerifyCodeScreen({
	navigation,
	route,
}: ScreenProps<'VerifyCode'>) {
	const [code, setCode] = useState('')
	const ref = useRef<TextInput>(null)

	return (
		<Screen>
			<Header />
			<View style={ui.centerBlock}>
				<Title center>Verify your number</Title>
				<Subtitle center>
					We just sent a code to{'\n'}
					<Text style={{ fontWeight: '700', color: colors.text }}>
						{route.params.phone}
					</Text>
				</Subtitle>

				<Pressable style={styles.row} onPress={() => ref.current?.focus()}>
					{[0, 1, 2, 3].map(i => (
						<View
							key={i}
							style={[styles.box, code.length === i && styles.boxActive]}
						>
							<Text style={styles.digit}>{code[i] ?? ''}</Text>
						</View>
					))}
				</Pressable>
				<TextInput
					ref={ref}
					value={code}
					onChangeText={t => setCode(t.replace(/\D/g, '').slice(0, 4))}
					keyboardType='number-pad'
					maxLength={4}
					autoFocus
					style={{ position: 'absolute', opacity: 0, height: 1, width: 1 }}
				/>

				<PrimaryButton
					title='Continue'
					style={{ alignSelf: 'stretch' }}
					onPress={() =>
						code.length === 4
							? navigation.navigate('ResetPassword')
							: Alert.alert('Enter the 4-digit code')
					}
				/>
				<LinkText
					style={{
						color: colors.muted,
						textDecorationLine: 'underline',
						marginTop: 16,
					}}
					onPress={() => Alert.alert('Code sent again')}
				>
					Resend code
				</LinkText>
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	row: { flexDirection: 'row', gap: 12, marginVertical: 24 },
	box: {
		width: 48,
		height: 48,
		borderRadius: 12,
		backgroundColor: colors.field,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1.5,
		borderColor: 'transparent',
	},
	boxActive: { borderColor: colors.primary },
	digit: { fontSize: 20, fontWeight: '500', color: colors.text },
})
