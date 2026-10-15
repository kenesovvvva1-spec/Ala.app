import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Props = { onBack?: () => void }

export default function Header({ onBack }: Props) {
	const navigation = useNavigation()

	const handleBack = () => {
		if (onBack) return onBack()
		if (navigation.canGoBack()) navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<Pressable onPress={handleBack} hitSlop={12} style={styles.btn}>
				<Ionicons name='arrow-back' size={22} color='#16161A' />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { height: 48, justifyContent: 'center' },
	btn: { width: 32, height: 32, justifyContent: 'center' },
})
