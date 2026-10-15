import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Screen from '../components/Screen'
import Header from '../components/Header'
import { PrimaryButton, Subtitle, Title, colors } from '../components/UI'
import type { ScreenProps } from '../App'

const CITIES = ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe']

export default function CityScreen({ navigation }: ScreenProps<'City'>) {
	const [city, setCity] = useState<string | null>(null)
	const [open, setOpen] = useState(false)

	return (
		<Screen
			bottom={
				<PrimaryButton
					title='Continue'
					onPress={() =>
						city
							? navigation.reset({
									index: 0,
									routes: [{ name: 'Home', params: { city } }],
								})
							: Alert.alert('Please select a city')
					}
				/>
			}
		>
			<Header />
			<Title>Choose your city</Title>
			<Subtitle>The places shown to you will depend on your city.</Subtitle>

			<Pressable style={styles.select} onPress={() => setOpen(!open)}>
				<Text style={[styles.selectText, city && { color: colors.text }]}>
					{city ?? 'Select city'}
				</Text>
				<Ionicons
					name={open ? 'chevron-up' : 'chevron-down'}
					size={16}
					color={colors.primary}
				/>
			</Pressable>

			{open && (
				<View style={styles.list}>
					{CITIES.map(c => (
						<Pressable
							key={c}
							style={styles.item}
							onPress={() => {
								setCity(c)
								setOpen(false)
							}}
						>
							<Text
								style={[
									styles.itemText,
									c === city && { color: colors.primary, fontWeight: '600' },
								]}
							>
								{c}
							</Text>
						</Pressable>
					))}
				</View>
			)}
		</Screen>
	)
}

const styles = StyleSheet.create({
	select: {
		marginTop: 22,
		height: 48,
		borderRadius: 12,
		backgroundColor: colors.field,
		paddingHorizontal: 14,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	selectText: { fontSize: 13, color: colors.muted },
	list: {
		marginTop: 6,
		borderRadius: 12,
		backgroundColor: colors.field,
		overflow: 'hidden',
	},
	item: { paddingHorizontal: 14, paddingVertical: 13 },
	itemText: { fontSize: 13, color: colors.text },
})
