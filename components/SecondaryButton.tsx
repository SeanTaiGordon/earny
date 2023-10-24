import React, { ReactNode } from "react";
import styled from "styled-components/native";

interface Props {
	children?: ReactNode;
	onPress?: () => void;
	disabled?: boolean;
}

const SecondaryButton: React.FC<Props> = ({
	onPress,
	children,
	disabled,
}: Props) => {
	return (
		<Container onPress={onPress} disabled={disabled}>
			{children}
		</Container>
	);
};

const Container = styled.TouchableOpacity<{ disabled }>`
	display: flex;
	padding: 10px 15px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 17px;
	align-self: center;
	flex-grow: 0;
	border-radius: 10px;
	background-color: ${({ disabled }) => (disabled ? "#A6A6A6" : "#727272")};
`;

export default SecondaryButton;
