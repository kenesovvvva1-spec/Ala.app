import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Screen from '../components/Screen'
import { Title, Subtitle, colors } from '../components/UI'
import type { ScreenProps } from '../App'

const EVENTS = [
	{
		id: '1',
		title: 'Live music',
		place: 'Night Owl',
		day: '12',
		month: 'OCT',
		time: '20:00',
	},
	{
		id: '2',
		title: 'Coffee tasting',
		place: 'Coffee Lab',
		day: '14',
		month: 'OCT',
		time: '16:30',
	},
	{
		id: '3',
		title: 'Bowling tournament',
		place: 'Bowling City',
		day: '18',
		month: 'OCT',
		time: '18:00',
	},
	{
		id: '4',
		title: 'Stand-up night',
		place: 'Nur Grill',
		day: '21',
		month: 'OCT',
		time: '19:30',
	},
	{
		id: '5',
		title: 'Dessert workshop',
		place: 'Sweet Corner',
		day: '25',
		month: 'OCT',
		time: '15:00',
	},
]

export default function EventsScreen({ route }: ScreenProps<'Events'>) {
	const city = route.params?.city
	const [onlyFav, setOnlyFav] = useState(false)
	const [favs, setFavs] = useState<string[]>(['1'])

	const toggle = (id: string) =>
		setFavs(f => (f.includes(id) ? f.filter(x => x !== id) : [...f, id]))
	const list = onlyFav ? EVENTS.filter(e => favs.includes(e.id)) : EVENTS

	return (
		<Screen active='Events' city={city}>
			<View style={{ height: 24 }} />
			<Title>Events</Title>
			<Subtitle>Upcoming events at places in your city.</Subtitle>

			<View style={styles.tabs}>
				{[false, true].map(fav => (
					<Pressable
						key={String(fav)}
						style={[styles.tab, onlyFav === fav && styles.tabOn]}
						onPress={() => setOnlyFav(fav)}
					>
						<Text
							style={[styles.tabText, onlyFav === fav && { color: '#fff' }]}
						>
							{fav ? `Favorites (${favs.length})` : 'All'}
						</Text>
					</Pressable>
				))}
			</View>

			{list.length === 0 && <Text style={styles.empty}>No favorites yet</Text>}
			{list.map(e => {
				const liked = favs.includes(e.id)
				return (
					<View key={e.id} style={styles.card}>
						<View style={styles.date}>
							<Text style={styles.day}>{e.day}</Text>
							<Text style={styles.month}>{e.month}</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={styles.name}>{e.title}</Text>
							<Text style={styles.meta}>
								{e.place} · {e.time}
							</Text>
						</View>
						<Pressable onPress={() => toggle(e.id)} hitSlop={10}>
							<Ionicons
								name={liked ? 'heart' : 'heart-outline'}
								size={22}
								color={liked ? colors.primary : colors.muted}
							/>
						</Pressable>
					</View>
				)
			})}
		</Screen>
	)
}

const styles = StyleSheet.create({
	tabs: { flexDirection: 'row', gap: 8, marginTop: 18 },
	tab: {
		paddingHorizontal: 16,
		height: 34,
		borderRadius: 17,
		backgroundColor: colors.field,
		justifyContent: 'center',
	},
	tabOn: { backgroundColor: colors.primary },
	tabText: { fontSize: 12, color: colors.text },
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
	date: {
		width: 52,
		height: 56,
		borderRadius: 12,
		backgroundColor: '#F4E3FA',
		alignItems: 'center',
		justifyContent: 'center',
	},
	day: { fontSize: 18, fontWeight: '700', color: colors.primary },
	month: { fontSize: 10, fontWeight: '600', color: colors.primary },
	name: { fontSize: 14, fontWeight: '600', color: colors.text },
	meta: { fontSize: 11, color: colors.muted, marginTop: 3 },
	empty: {
		textAlign: 'center',
		color: colors.muted,
		marginTop: 40,
		fontSize: 13,
	},
})
