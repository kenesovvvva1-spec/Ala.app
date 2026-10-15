import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Screen from '../components/Screen'
import { colors } from '../components/UI'
import type { ScreenProps } from '../App'

type RowProps = {
	icon: keyof typeof Ionicons.glyphMap
	label: string
	value?: string
	onPress: () => void
	danger?: boolean
}

function Row({ icon, label, value, onPress, danger }: RowProps) {
	return (
		<Pressable style={styles.row} onPress={onPress}>
			<View style={styles.rowIcon}>
				<Ionicons
					name={icon}
					size={18}
					color={danger ? '#E5484D' : colors.primary}
				/>
			</View>
			<Text style={[styles.rowLabel, danger && { color: '#E5484D' }]}>
				{label}
			</Text>
			{value ? <Text style={styles.rowValue}>{value}</Text> : null}
			<Ionicons name='chevron-forward' size={16} color={colors.muted} />
		</Pressable>
	)
}

export default function ProfileScreen({
	navigation,
	route,
}: ScreenProps<'Profile'>) {
	const city = route.params?.city ?? 'Almaty'

	return (
		<Screen active='Profile' city={city}>
			<View style={{ height: 24 }} />
			<View style={{ alignItems: 'center' }}>
				<View style={styles.avatar}>
					<Text style={styles.avatarText}>R</Text>
				</View>
				<Text style={styles.name}>Ruslan</Text>
				<Text style={styles.phone}>+7 (700) 555 77 55</Text>
			</View>

			<View style={styles.stats}>
				{[
					['12', 'Visited'],
					['5', 'Favorites'],
					['8', 'Reviews'],
				].map(([n, l]) => (
					<View key={l} style={styles.stat}>
						<Text style={styles.statNum}>{n}</Text>
						<Text style={styles.statLabel}>{l}</Text>
					</View>
				))}
			</View>

			<Row
				icon='location'
				label='My city'
				value={city}
				onPress={() => navigation.navigate('City')}
			/>
			<Row
				icon='heart'
				label='Favorite events'
				onPress={() => navigation.replace('Events', { city })}
			/>
			<Row
				icon='log-out'
				label='Log out'
				danger
				onPress={() =>
					navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
				}
			/>
		</Screen>
	)
}

const styles = StyleSheet.create({
	avatar: {
		width: 84,
		height: 84,
		borderRadius: 42,
		backgroundColor: colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarText: { fontSize: 34, fontWeight: '700', color: '#fff' },
	name: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 12 },
	phone: { fontSize: 12, color: colors.muted, marginTop: 4 },
	stats: { flexDirection: 'row', gap: 10, marginVertical: 22 },
	stat: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 14,
		borderRadius: 14,
		backgroundColor: colors.field,
	},
	statNum: { fontSize: 18, fontWeight: '700', color: colors.primary },
	statLabel: { fontSize: 11, color: colors.muted, marginTop: 2 },
	row: {
		height: 54,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	rowIcon: {
		width: 32,
		height: 32,
		borderRadius: 10,
		backgroundColor: '#F4E3FA',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	rowLabel: { flex: 1, fontSize: 14, color: colors.text },
	rowValue: { fontSize: 12, color: colors.muted, marginRight: 6 },
})
