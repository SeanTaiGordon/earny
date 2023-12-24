import React, { useContext } from "react";
import Main from "./main";
import { UserContext } from "./_layout";
import CreateProfile from "./createProfile";

export const Base = () => {
	const context = useContext(UserContext);
	return context ? <Main /> : <CreateProfile />;
};

export default Base;
