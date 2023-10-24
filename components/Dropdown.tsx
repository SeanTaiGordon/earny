import React from "react";
import styled from "styled-components/native";
import GeoAltIcon from "react-native-bootstrap-icons/icons/geo-alt";
import ClockIcon from "react-native-bootstrap-icons/icons/clock";
import WalletIcon from "react-native-bootstrap-icons/icons/wallet";
import ChevronDownIcon from "react-native-bootstrap-icons/icons/chevron-down";

type Icons = "geo-alt" | "clock" | "wallet";

interface Props {
	darkMode?: boolean;
	title: string;
	subtitle: string;
	iconName: Icons;
}

const Dropdown = ({ darkMode = false, title, subtitle, iconName }: Props) => {
	const getIconFromName = (iconName: Icons) => {
		switch (iconName) {
			case "geo-alt":
				return (
					<GeoAltIcon
						color={Colors.mainIconColor}
						height="32"
						width="32"
						viewBox="0 0 16 16"
					/>
				);
			case "clock":
				return (
					<ClockIcon
						color={Colors.mainIconColor}
						height="32"
						width="32"
						viewBox="0 0 16 16"
					/>
				);
			case "wallet":
				return (
					<WalletIcon
						color={Colors.mainIconColor}
						height="32"
						width="32"
						viewBox="0 0 16 16"
					/>
				);
		}
	};

	const Colors = darkMode
		? {
				mainIconColor: "#BCBCBC",
				navIconColor: "#FFFFFF",
				background: "#272727",
				titleColor: "#FFFFFF",
				subTitleColor: "#B4B4B4",
		  }
		: {
				mainIconColor: "#5E5E5E",
				navIconColor: "#282828",
				background: "#EAEAEA",
				titleColor: "#282828",
				subTitleColor: "#5E5E5E",
		  };

	return (
		<Container background={Colors.background}>
			{getIconFromName(iconName)}

			<Header>
				<SubTitle color={Colors.subTitleColor}>{subtitle}</SubTitle>
				<Title color={Colors.titleColor}>{title}</Title>
			</Header>

			<ChevronDownIcon
				color={Colors.navIconColor}
				height="32"
				width="32"
				viewBox="0 0 16 16"
			/>
		</Container>
	);
};

const Container = styled.TouchableOpacity<{ background: string }>`
	display: flex;
	padding: 14px 18px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 17px;
	align-self: stretch;
	border-radius: 10px;
	background-color: ${(props) => props.background};
`;

const Header = styled.View`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: center;
`;

const Title = styled.Text<{ color: string }>`
	display: flex;
	justify-content: center;
	color: ${(props) => props.color};
	font-family: Jost;
	font-size: 19px;
	font-weight: 400;
`;

const SubTitle = styled.Text<{ color: string }>`
	font-family: Jost;
	font-size: 13px;
	font-weight: 400;
	color: ${(props) => props.color};
`;

export default Dropdown;
