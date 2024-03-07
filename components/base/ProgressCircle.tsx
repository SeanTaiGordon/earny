import React, { Component } from "react";
import { View, Animated } from "react-native";

interface Props {
	value: number | Animated.Value;
	size: number;
	thickness: number;
	color: string;
	unfilledColor: string;
	style: object;
	children: React.ReactNode;
	animationMethod: "timing" | "spring" | "decay";
	animationConfig: object;
	shouldAnimateFirstValue: boolean;
	onChange: () => void;
	onChangeAnimationEnd: () => void;
}

interface State {
	animatedValue: Animated.Value | null;
}

export class ProgressCircle extends Component {
	static defaultProps: Props = {
		value: 0,
		size: 64,
		thickness: 7,
		color: "#4c90ff",
		unfilledColor: "transparent",
		style: {},
		children: null,
		animationMethod: null,
		animationConfig: { duration: 200 },
		shouldAnimateFirstValue: false,
		onChange() {},
		onChangeAnimationEnd() {},
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			animatedValue:
				props.value.constructor.name === "AnimatedValue"
					? null
					: new Animated.Value(
							Number(props.shouldAnimateFirstValue ? 0 : props.value)
					  ),
		} as State;
	}

	componentDidMount() {
		if (
			(this.props as Props).value.constructor.name !== "AnimatedValue" &&
			(this.props as Props).shouldAnimateFirstValue &&
			this.animationMethod
		) {
			this.animateChange((this.props as Props).value);
		}
	}

	componentWillReceiveProps({ value }) {
		this.handleChange(value);
	}

	render() {
		const { thickness, unfilledColor, children, style } = this.props as Props;

		return (
			<View style={[this.fullCircleStyle, { flexDirection: "row" }, style]}>
				<View
					pointerEvents="box-none"
					style={{
						...this.fullCircleStyle,
						borderWidth: thickness,
						borderColor: unfilledColor,
						position: "absolute",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{children}
				</View>
				{this.renderHalfCircle()}
				{this.renderHalfCircle({ isFlipped: true })}
			</View>
		);
	}

	get fullCircleStyle() {
		return {
			width: (this.props as Props).size,
			height: (this.props as Props).size,
			borderRadius: (this.props as Props).size / 2,
		};
	}

	get halfCircleContainerStyle() {
		return {
			width: (this.props as Props).size / 2,
			height: (this.props as Props).size,
			overflow: "hidden",
		};
	}

	ANIMATION_TYPES = ["timing", "spring", "decay"];
	get animationMethod() {
		return this.ANIMATION_TYPES.includes((this.props as Props).animationMethod)
			? (this.props as Props).animationMethod
			: null;
	}

	handleChange = (value = (this.props as Props).value) => {
		(this.props as Props).onChange();
		if (value.constructor.name === "AnimatedValue") {
			return;
		}

		if (this.animationMethod) {
			this.animateChange(value);
		} else {
			(this.state as State).animatedValue.setValue(value as number);
		}
	};

	animateChange = (value) =>
		Animated[this.animationMethod]((this.state as State).animatedValue, {
			toValue: value,
			useNativeDriver: true,
			velocity: 0.5,
			...(this.props as Props).animationConfig,
		}).start((this.props as Props).onChangeAnimationEnd);

	renderHalfCircle = ({ isFlipped = false } = {}) => {
		const { size, color, thickness, value, style } = this.props as Props;
		const valueToInterpolate =
			value.constructor.name === "AnimatedValue"
				? value
				: (this.state as State).animatedValue;

		return (
			<Animated.View
				pointerEvents="none"
				style={[
					{
						...this.halfCircleContainerStyle,
						transform: [{ scaleX: isFlipped ? -1 : 1 }],
					},
					style,
				]}
			>
				<Animated.View
					style={{
						width: size,
						height: size,
						transform: [
							{
								rotate: (valueToInterpolate as Animated.Value).interpolate({
									inputRange: isFlipped ? [0, 0.5] : [0.5, 1],
									outputRange: isFlipped
										? ["180deg", "0deg"]
										: ["-180deg", "0deg"],
									extrapolate: "clamp",
								}),
							},
						],
					}}
				>
					<View
						style={{ ...this.halfCircleContainerStyle, overflow: "hidden" }}
					>
						<View
							style={{
								...this.fullCircleStyle,
								borderWidth: thickness,
								borderColor: color,
							}}
						/>
					</View>
				</Animated.View>
			</Animated.View>
		);
	};
}
