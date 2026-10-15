import React, { useState } from 'react'
import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export const colors = {
	primary: '#A10FD1',
	text: '#16161A',
	muted: '#9A9AA5',
	field: '#F5F5F7',
	border: '#ECECF1',
	white: '#FFFFFF',
}

type IconName = keyof typeof Ionicons.glyphMap

export function Title({
	children,
	center,
	style,
}: {
	children: React.ReactNode
	center?: boolean
	style?: TextStyle
}) {
	return (
		<Text style={[s.title, center && { textAlign: 'center' }, style]}>
			{children}
		</Text>
	)
}

export function Subtitle({
	children,
	center,
	style,
}: {
	children: React.ReactNode
	center?: boolean
	style?: TextStyle
}) {
	return (
		<Text style={[s.subtitle, center && { textAlign: 'center' }, style]}>
			{children}
		</Text>
	)
}

export function Field({
	icon,
	secure,
	style,
	value,
	...rest
}: { icon: IconName; secure?: boolean; style?: ViewStyle } & TextInputProps) {
	const [hidden, setHidden] = useState(!!secure)
	const filled = !!value
	return (
		<View style={[s.field, style]}>
			<Ionicons
				name={icon}
				size={18}
				color={filled ? colors.primary : colors.muted}
			/>
			<TextInput
				style={s.input}
				placeholderTextColor={colors.muted}
				value={value}
				secureTextEntry={hidden}
				autoCapitalize='none'
				{...rest}
			/>
			{secure ? (
				<Pressable onPress={() => setHidden(!hidden)} hitSlop={10}>
					<Ionicons
						name={hidden ? 'eye-off' : 'eye'}
						size={18}
						color={filled ? colors.primary : colors.muted}
					/>
				</Pressable>
			) : null}
		</View>
	)
}

export function PrimaryButton({
	title,
	onPress,
	style,
}: {
	title: string
	onPress: () => void
	style?: ViewStyle
}) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [s.button, pressed && { opacity: 0.85 }, style]}
		>
			<Text style={s.buttonText}>{title}</Text>
		</Pressable>
	)
}

export function LinkText({
	children,
	onPress,
	style,
}: {
	children: React.ReactNode
	onPress?: () => void
	style?: TextStyle
}) {
	return (
		<Text onPress={onPress} style={[s.link, style]}>
			{children}
		</Text>
	)
}

export function Checkbox({
	checked,
	onToggle,
	children,
}: {
	checked: boolean
	onToggle: () => void
	children: React.ReactNode
}) {
	return (
		<Pressable onPress={onToggle} style={s.checkRow}>
			<View
				style={[
					s.checkbox,
					checked && {
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					},
				]}
			>
				{checked ? <Ionicons name='checkmark' size={14} color='#fff' /> : null}
			</View>
			<Text style={s.checkText}>{children}</Text>
		</Pressable>
	)
}

type RegisterValues = {
	name: string
	phone: string
	password: string
	agree: boolean
}

export function RegisterForm({
	initial,
	onSubmit,
	onLogin,
}: {
	initial: RegisterValues
	onSubmit: (v: RegisterValues) => void
	onLogin: () => void
}) {
	const [v, setV] = useState<RegisterValues>(initial)
	return (
		<View>
			<Title>Sign up</Title>
			<Subtitle>Create an account{'\n'}to continue!</Subtitle>
			<View style={{ height: 22 }} />
			<Field
				icon='person'
				placeholder='Your name'
				value={v.name}
				onChangeText={name => setV({ ...v, name })}
				style={s.gap}
			/>
			<Field
				icon='call'
				placeholder='Phone number'
				keyboardType='phone-pad'
				value={v.phone}
				onChangeText={phone => setV({ ...v, phone })}
				style={s.gap}
			/>
			<Field
				icon='lock-closed'
				secure
				placeholder='Password'
				value={v.password}
				onChangeText={password => setV({ ...v, password })}
				style={s.gap}
			/>
			<Checkbox
				checked={v.agree}
				onToggle={() => setV({ ...v, agree: !v.agree })}
			>
				By creating an account, you{'\n'}agree to our{' '}
				<Text style={{ color: colors.primary }}>Terms</Text> of use.
			</Checkbox>
			<PrimaryButton
				title='Sign up'
				style={{ marginTop: 16 }}
				onPress={() => {
					if (!v.agree && v.name) return Alert.alert('Please accept the terms')
					onSubmit(v)
				}}
			/>
			<Text style={s.bottomText}>
				Already have an account? <LinkText onPress={onLogin}>Log in</LinkText>
			</Text>
		</View>
	)
}

export function TabBar({
	active,
	city,
}: {
	active: 'Home' | 'Events' | 'Profile'
	city?: string
}) {
	const nav = useNavigation<any>()
	const items: {
		name: 'Home' | 'Events' | 'Profile'
		label: string
		icon: IconName
		iconOff: IconName
	}[] = [
		{ name: 'Home', label: 'Home', icon: 'home', iconOff: 'home-outline' },
		{
			name: 'Events',
			label: 'Events',
			icon: 'calendar',
			iconOff: 'calendar-outline',
		},
		{
			name: 'Profile',
			label: 'Profile',
			icon: 'person',
			iconOff: 'person-outline',
		},
	]
	return (
		<View style={s.tabBar}>
			{items.map(it => {
				const on = it.name === active
				return (
					<Pressable
						key={it.name}
						style={s.tab}
						onPress={() => !on && nav.replace(it.name, { city })}
					>
						<Ionicons
							name={on ? it.icon : it.iconOff}
							size={22}
							color={on ? colors.primary : colors.muted}
						/>
						<Text style={[s.tabLabel, on && { color: colors.primary }]}>
							{it.label}
						</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

export const ui = StyleSheet.create({
	centerBlock: { marginTop: 70, alignItems: 'center' },
})

const s = StyleSheet.create({
	title: { fontSize: 22, fontWeight: '700', color: colors.text },
	subtitle: { fontSize: 12, color: colors.muted, marginTop: 6, lineHeight: 17 },
	field: {
		height: 48,
		borderRadius: 12,
		backgroundColor: colors.field,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		marginLeft: 8,
		fontSize: 13,
		color: colors.text,
		paddingVertical: 0,
	},
	gap: { marginBottom: 14 },
	button: {
		height: 48,
		borderRadius: 12,
		backgroundColor: colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
	link: { color: colors.primary, fontSize: 12 },
	checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: '#D4D4DC',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkText: {
		flex: 1,
		marginLeft: 10,
		fontSize: 11,
		color: colors.muted,
		lineHeight: 15,
	},
	bottomText: {
		textAlign: 'center',
		marginTop: 20,
		fontSize: 12,
		color: colors.muted,
	},
	tabBar: {
		flexDirection: 'row',
		borderTopWidth: 1,
		borderTopColor: colors.border,
		backgroundColor: '#fff',
		paddingTop: 8,
		paddingBottom: 6,
	},
	tab: { flex: 1, alignItems: 'center', gap: 2 },
	tabLabel: { fontSize: 10, color: colors.muted },
})
