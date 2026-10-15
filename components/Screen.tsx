import React from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { TabBar } from './UI'

type Props = {
	children: React.ReactNode
	bottom?: React.ReactNode
	active?: 'Home' | 'Events' | 'Profile'
	city?: string
}

export default function Screen({ children, bottom, active, city }: Props) {
	return (
		<SafeAreaView style={styles.safe}>
			<StatusBar style='dark' />
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<ScrollView
					style={styles.flex}
					contentContainerStyle={styles.content}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}
				>
					{children}
				</ScrollView>
				{bottom ? <View style={styles.bottom}>{bottom}</View> : null}
			</KeyboardAvoidingView>
			{active ? <TabBar active={active} city={city} /> : null}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: '#fff' },
	flex: { flex: 1 },
	content: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 24 },
	bottom: { paddingHorizontal: 20, paddingBottom: 16, paddingTop: 8 },
})
