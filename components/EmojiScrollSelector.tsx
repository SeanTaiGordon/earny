import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

interface Props {
	selectorColor?: string;
	getSelectedIcon: string;
	getColor: string;
	onIconSelect: (selectedIcon: string) => void;
}

export const EmojiScrollSelector = ({
	selectorColor = "#d9d9d9",
	getSelectedIcon,
	getColor,
	onIconSelect,
}: Props) => {
	const [scrollWidth, setScrollWidth] = useState<number>(0); // Change type from Number to number
	const scrollView = useRef<ScrollView>(null);
	const items = ["🧑‍💻", "🧑‍🎓", "🧑‍🔬", "🧑‍🎨", "🧑‍🌾", "🧑‍🏫", "🧑‍💼", "🧙", "🦹", "🤵"];

	useEffect(() => {
		scrollView!.current!.scrollTo({
			x: 80 * items.indexOf(getSelectedIcon.toString()),
			y: 0,
			animated: true,
		});
	}, [getColor]);

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
						background={
							item === getSelectedIcon ? selectorColor : "transparent"
						}
						key={`head-${index}`}
						onPress={() => {
							scrollView &&
								scrollView!.current!.scrollTo({
									x: 80 * index,
									y: 0,
									animated: true,
								});
							onIconSelect(item);
						}}
					>
						<ItemText>{item}</ItemText>
					</Item>
				))}

				<Padding scrollWidth={scrollWidth as number} />
			</ScrollView>
		</Container>
	);
};

const Container = styled.View`
	min-height: 80px;
	margin-top: 20px;
	margin-bottom: 20px;
	scroll-snap-align: center;
`;

const ItemText = styled.Text`
	font-size: 40px;
`;
const Item = styled.TouchableOpacity<{ background: string }>`
	background-color: ${({ background }) => background};
	margin-left: 5px;
	margin-right: 5px;
	width: 70px;
	height: 70px;
	align-self: center;
	align-items: center;
	justify-content: center;
	flex: 1;
	border-radius: 50%;
`;

const Padding = styled.View<{ scrollWidth: number }>`
	width: ${({ scrollWidth }) => scrollWidth - 80 + "px"};
`;
