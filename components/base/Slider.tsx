import React, { useState, useRef, useEffect } from "react";
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
	defaultInterval?: number;
	initialValue: number;
}

export const Slider: React.FC<SliderProps> = ({
	onValueChange,
	numIntervals,
	defaultInterval = 0,
	initialValue,
}) => {
	const [viewWidth, setViewWidth] = useState(0);
	const [preValue, setPrevValue] = useState(0);
	const thumbX = useRef(new Animated.Value(0)).current;
	const trackWidth = useRef(new Animated.Value(0)).current;
	const intervalStep = 100 / numIntervals;
	const maxWidth = viewWidth - 25;

	useEffect(() => {
		const initialPosition = (maxWidth - 25) / 2;
		Animated.spring(thumbX, {
			toValue: initialPosition,
			useNativeDriver: false,
		}).start();

		Animated.spring(trackWidth, {
			toValue: initialPosition + 5,
			useNativeDriver: false,
		}).start();

		onValueChange(initialValue);
	}, [defaultInterval, viewWidth]);

	const calculateSnappedValue = (touchX: number) => {
		const newValue = (touchX / maxWidth) * 100;
		const snappedValue = Math.round(newValue / intervalStep) * intervalStep;
		return snappedValue;
	};

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (_e, gestureState) => {
			const touchX = Math.max(0, Math.min(gestureState.moveX - 25, maxWidth));
			const numOfPositions = maxWidth / 50;
			const position = (touchX / maxWidth) * 100;

			onValueChange(position);

			Animated.spring(thumbX, {
				toValue: position < 1 ? touchX : touchX - 25,
				useNativeDriver: false,
			}).start();

			Animated.spring(trackWidth, {
				toValue: touchX + 5,
				useNativeDriver: false,
			}).start();
		},
		onPanResponderRelease: () => {
			// When the user releases the thumb, snap it to the nearest interval
			if (numIntervals > 1) {
				const currentPosition = (thumbX as any)._value;
				const snappedValue = calculateSnappedValue(currentPosition);
				const position = (snappedValue / 100) * (maxWidth - 25);

				onValueChange(snappedValue);
				setPrevValue(position);
				Animated.spring(thumbX, {
					toValue: position,
					useNativeDriver: false,
				}).start();

				Animated.spring(trackWidth, {
					toValue: position + 5,
					useNativeDriver: false,
				}).start();
			}
		},
	});

	return (
		<View style={styles.sliderContainer}>
			<View
				style={styles.sliderTrack}
				onLayout={(event) => {
					const { width } = event.nativeEvent.layout;
					setViewWidth(width);
				}}
			>
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
