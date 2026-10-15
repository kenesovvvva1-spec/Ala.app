import React, { useMemo, useState } from 'react'
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Screen from '../components/Screen'
import { colors } from '../components/UI'
import type { ScreenProps } from '../App'

type Place = {
	id: string
	name: string
	category: string
	rating: number
	address: string
	icon: keyof typeof Ionicons.glyphMap
}

const CATEGORIES = ['All', 'Cafes', 'Restaurants', 'Bars', 'Entertainment']

const PLACES: Place[] = [
	{
		id: '1',
		name: 'Coffee Lab',
		category: 'Cafes',
		rating: 4.8,
		address: 'Abay St, 12',
		icon: 'cafe',
	},
	{
		id: '2',
		name: 'Nur Grill',
		category: 'Restaurants',
		rating: 4.6,
		address: 'Dostyk Ave, 45',
		icon: 'restaurant',
	},
	{
		id: '3',
		name: 'Night Owl',
		category: 'Bars',
		rating: 4.5,
		address: 'Gogol St, 8',
		icon: 'beer',
	},
	{
		id: '4',
		name: 'Bowling City',
		category: 'Entertainment',
		rating: 4.7,
		address: 'Al-Farabi Ave, 77',
		icon: 'game-controller',
	},
	{
		id: '5',
		name: 'Sweet Corner',
		category: 'Cafes',
		rating: 4.4,
		address: 'Zhandosov St, 3',
		icon: 'ice-cream',
	},
]

export default function HomeScreen({ navigation, route }: ScreenProps<'Home'>) {
	const city = route.params?.city ?? 'Almaty'
	const [cat, setCat] = useState('All')
	const [query, setQuery] = useState('')

	const data = useMemo(
		() =>
			PLACES.filter(
				p =>
					(cat === 'All' || p.category === cat) &&
					p.name.toLowerCase().includes(query.trim().toLowerCase()),
			),
		[cat, query],
	)

	return (
		<Screen active='Home' city={city}>
			<View style={styles.top}>
				<Pressable
					style={styles.cityChip}
					onPress={() => navigation.navigate('City')}
				>
					<Ionicons name='location' size={16} color={colors.primary} />
					<Text style={styles.cityText}>{city}</Text>
					<Ionicons name='chevron-down' size={14} color={colors.primary} />
				</Pressable>
				<Ionicons name='notifications-outline' size={22} color={colors.text} />
			</View>

			<Text style={styles.title}>Where to go today?</Text>
			<View style={styles.search}>
				<Ionicons name='search' size={18} color={colors.muted} />
				<TextInput
					style={styles.searchInput}
					placeholder='Search places'
					placeholderTextColor={colors.muted}
					value={query}
					onChangeText={setQuery}
				/>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={{ marginTop: 14, flexGrow: 0 }}
			>
				{CATEGORIES.map(c => (
					<Pressable
						key={c}
						onPress={() => setCat(c)}
						style={[styles.chip, c === cat && styles.chipOn]}
					>
						<Text style={[styles.chipText, c === cat && { color: '#fff' }]}>
							{c}
						</Text>
					</Pressable>
				))}
			</ScrollView>

			{data.length === 0 && <Text style={styles.empty}>Nothing found</Text>}
			{data.map(p => (
				<View key={p.id} style={styles.card}>
					<View style={styles.thumb}>
						<Ionicons name={p.icon} size={28} color={colors.primary} />
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.name}>{p.name}</Text>
						<Text style={styles.meta}>
							{p.category} · {p.address}
						</Text>
					</View>
					<View style={styles.rating}>
						<Ionicons name='star' size={12} color={colors.primary} />
						<Text style={styles.ratingText}>{p.rating}</Text>
					</View>
				</View>
			))}
		</Screen>
	)
}

const styles = StyleSheet.create({
	top: {
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cityChip: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: colors.field,
		paddingHorizontal: 12,
		height: 34,
		borderRadius: 17,
	},
	cityText: { fontSize: 13, fontWeight: '600', color: colors.text },
	title: {
		fontSize: 22,
		fontWeight: '700',
		color: colors.text,
		marginTop: 6,
		marginBottom: 14,
	},
	search: {
		height: 48,
		borderRadius: 12,
		backgroundColor: colors.field,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	searchInput: {
		flex: 1,
		marginLeft: 8,
		fontSize: 13,
		color: colors.text,
		paddingVertical: 0,
	},
	chip: {
		paddingHorizontal: 14,
		height: 34,
		borderRadius: 17,
		backgroundColor: colors.field,
		justifyContent: 'center',
		marginRight: 8,
	},
	chipOn: { backgroundColor: colors.primary },
	chipText: { fontSize: 12, color: colors.text },
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginTop: 14,
		padding: 12,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.border,
	},
	thumb: {
		width: 56,
		height: 56,
		borderRadius: 12,
		backgroundColor: '#F4E3FA',
		alignItems: 'center',
		justifyContent: 'center',
	},
	name: { fontSize: 14, fontWeight: '600', color: colors.text },
	meta: { fontSize: 11, color: colors.muted, marginTop: 3 },
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		backgroundColor: '#F4E3FA',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 10,
	},
	ratingText: { fontSize: 11, fontWeight: '600', color: colors.primary },
	empty: {
		textAlign: 'center',
		color: colors.muted,
		marginTop: 40,
		fontSize: 13,
	},
})
