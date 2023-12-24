import React, { useContext } from "react";
import { ScreenContainer, AddButton } from "../components";
import { auth } from "../config";
import { router } from "expo-router";
import { UserContext } from "./_layout";
export const Profile = () => {
	const user = useContext(UserContext);

	console.log(user);

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
