import React, { createContext, useEffect, useMemo, useState } from "react";
import {
	useFonts,
	DelaGothicOne_400Regular,
} from "@expo-google-fonts/dela-gothic-one";
import { Jost_400Regular, Jost_500Medium } from "@expo-google-fonts/jost";

import { Stack } from "expo-router";
import { User, onAuthStateChanged } from "firebase/auth";
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { auth } from "../config";

export const UserContext = createContext<User | undefined>(undefined);

const Layout = () => {
	let [fontsLoaded] = useFonts({
		DelaGothicOne_400Regular,
		Jost_400Regular,
		Jost_500Medium,
	});

	const httpLink = createHttpLink({
		uri: "http://localhost:4000/graphql",
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		// return the headers to the context so httpLink can read them
		return auth.currentUser
			?.getIdToken()
			.then((token) => {
				return {
					headers: {
						...headers,
						Token: token,
					},
				};
			})
			.catch(() => {
				return {
					headers: { ...headers },
				};
			});
	});

	// Initialize Apollo Client
	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => setUser(user));
	}, [user]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<UserContext.Provider value={user as User | undefined}>
			<ApolloProvider client={client}>
				<Stack screenOptions={{ headerShown: false }} />
			</ApolloProvider>
		</UserContext.Provider>
	);
};

export default Layout;
