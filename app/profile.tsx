import React, { useContext } from "react";
import { ScreenContainer, AddButton } from "../components";
import { auth } from "../config";
import { router } from "expo-router";
import { UserContext } from "./_layout";

const USER_QUERY_SELF = gql`
	query Self {
		self {
			profile {
				emoji
				color
			}
		}
	}
`;

export const Profile = () => {
	const user = useContext(UserContext);

	return (
		<ScreenContainer>
			<AddButton
				title={"Logout"}
				onPress={() =>
					auth.signOut().then(() => {
						router.back();
					})
				}
			/>
		</ScreenContainer>
	);
};

export default Profile;
