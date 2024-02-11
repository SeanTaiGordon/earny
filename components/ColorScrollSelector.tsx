import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import TickIcon from "react-native-bootstrap-icons/icons/check-lg";

interface Props {
	onColorChange: (color: String) => void;
	getColor: String;
	getSelectedIcon: String;
}

export const ColorScrollSelector = ({
	onColorChange,
	getColor,
	getSelectedIcon,
}: Props) => {
	const [scrollWidth, setScrollWidth] = useState<number>(0);
	const scrollView = useRef<ScrollView>(null);
	const items = [
		"#d9d9d9",
		"#EA8685",
		"#63CDDA",
		"#F3A683",
		"#C4E538",
		"#FDA7DF",
		"#ED4C67",
		"#D980FA",
		"#1289A7",
	];

	useEffect(() => {
		scrollView!.current!.scrollTo({
			x: 80 * items.indexOf(getColor.toString()),
			y: 0,
			animated: true,
		});
	}, [getSelectedIcon]);

	return (
		<Container>
			<ScrollView
				horizontal
				snapToInterval={80}
				decelerationRate={"fast"}
				onLayout={(event) => setScrollWidth(event.nativeEvent.layout.width)}
				ref={scrollView}
				showsHorizontalScrollIndicator={false}
			>
				{items.map((item, index) => (
					<Item
						color={item}
						key={`head-${index}`}
						onPress={() => {
							scrollView &&
								scrollView!.current!.scrollTo({
									x: 80 * index,
									y: 0,
									animated: true,
								});
							onColorChange(item);
						}}
					>
						{getColor === item && (
							<Tick viewBox="0 0 16 16" width="25px" height="25px" />
						)}
					</Item>
				))}

				<Padding scrollWidth={scrollWidth} />
			</ScrollView>
		</Container>
	);
};

const Container = styled.View`
	min-height: 80px;
	margin-top: 10px;
	margin-bottom: 20px;
	scroll-snap-align: center;
`;

const Tick = styled(TickIcon)`
	margin-top: 27px;
	margin-left: 27px;
	position: absolute;
	z-index: 1;
	color: rgba(0, 0, 0, 0.7);
	flex: 1;
`;

const Item = styled.TouchableOpacity<{ color: string }>`
	background: ${({ color }) => color};
	width: 70px;
	height: 70px;
	margin: 5px;
	border-radius: 35px;
	align-self: center;
	align-items: center;
	justify-content: center;
	flex: 1;
`;

const Padding = styled.View<{ scrollWidth: number }>`
	width: ${({ scrollWidth }) => scrollWidth - 80 + "px"};
`;
