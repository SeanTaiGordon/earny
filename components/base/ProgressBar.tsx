import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";

const ProgressBarContainer = styled.View`
	width: 100%;
	background-color: #e0e0de;
	border-radius: 8px;
	margin: 20px 0;
	overflow: hidden;
	position: relative;
	height: 20px;
`;

const Filler = styled(Animated.View)`
	background-color: #4caf50;
	height: 100%;
	border-radius: 8px;
`;

// Moved Label outside Filler and used absolute positioning relative to ProgressBarContainer
const Label = styled.Text`
	color: white;
	font-weight: bold;
	position: absolute;
	width: 100%;
	text-align: center;
	top: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
`;

export const ProgressBar = ({ value, maxValue }) => {
	const [fillAnimation] = useState(new Animated.Value(0)); // Initial animation value

	useEffect(() => {
		Animated.timing(fillAnimation, {
			toValue: value,
			duration: 500,
			useNativeDriver: false, // width and height not supported with native driver
		}).start();
	}, [value, fillAnimation]);

	const widthInterpolated = fillAnimation.interpolate({
		inputRange: [0, maxValue],
		outputRange: ["0%", "100%"],
		extrapolate: "clamp",
	});

	return (
		<ProgressBarContainer>
			<Filler style={{ width: widthInterpolated }} />
			<Label>{`${Math.round((value / maxValue) * 100)}%`}</Label>
		</ProgressBarContainer>
	);
};
