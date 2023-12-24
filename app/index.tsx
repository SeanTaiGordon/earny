import React, { useContext } from "react";
import Home from "./home";
import Main from "./main";
import { UserContext } from "./_layout";

export const Base = () => {
	const context = useContext(UserContext);
	return context ? <Main /> : <Home />;
};

export default Base;
