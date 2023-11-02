import React, { useState, useRef } from "react";
import {
	View,
	PanResponder,
	StyleSheet,
	Animated,
	Dimensions,
} from "react-native";

interface SliderProps {
	onValueChange: (value: number) => void;
	numIntervals: number;
}
export const Slider: React.FC<SliderProps> = ({
	onValueChange,
	numIntervals,
}) => {
	const thumbX = useRef(new Animated.Value(0)).current;
	const trackWidth = useRef(new Animated.Value(0)).current;
	const intervalStep = 100 / numIntervals;

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (_e, gestureState) => {
			const maxWidth = Dimensions.get("window").width - 60;
			const touchX = Math.max(0, Math.min(gestureState.moveX, maxWidth));
			const newValue = (touchX / maxWidth) * 100;

			let snappedValue = Math.round(newValue / intervalStep) * intervalStep;
			let position = (snappedValue / 100) * (maxWidth - 50);

			onValueChange(snappedValue); // Call the prop function to pass the value

			Animated.spring(thumbX, {
				toValue: position,
				useNativeDriver: false,
			}).start();

			Animated.spring(trackWidth, {
				toValue: position + 5,
				useNativeDriver: false,
			}).start();
		},
	});

	return (
		<View style={styles.sliderContainer}>
			<View style={styles.sliderTrack}>
				<Animated.View
					style={[styles.sliderBackground, { width: trackWidth }]}
				/>
				<Animated.View
					style={[styles.sliderThumb, { left: thumbX }]}
					{...panResponder.panHandlers}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	sliderContainer: {
		width: "100%",
		alignItems: "flex-start",
	},

	sliderTrack: {
		width: "100%",
		height: 50,
		backgroundColor: "#E3E3E3",
		position: "relative",
		borderRadius: 6,
		overflow: "hidden",
	},
	sliderBackground: {
		height: "100%",
		backgroundColor: "#8E4DFF",
		position: "absolute",
	},
	sliderThumb: {
		width: 50,
		height: 50,
		borderWidth: 3,
		borderColor: "#8E4DFF",
		borderRadius: 6,
		backgroundColor: "white",
		position: "absolute",
		overflow: "hidden",
	},
});
