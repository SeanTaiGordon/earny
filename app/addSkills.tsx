import React, { useEffect, useState } from "react";
import {
	KeyboardDismissableView,
	MainButton,
	NavBackButton,
	PaddedContainer,
	ScreenContainer,
	SecondaryButton,
	SelectableButton,
	Subtitle,
	Title,
} from "../components";
import styled from "styled-components/native";
import { router, useLocalSearchParams } from "expo-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ScrollView } from "react-native";

const SET_SKILLS = gql`
	mutation Mutation($skills: [String]!) {
		setSkills(skills: $skills)
	}
`;

const QUERY_AVAILABLE_SKILLS = gql`
	query SkillOptions {
		skillOptions {
			skills
		}
	}
`;

const AddSkills = () => {
	const { data } = useQuery(QUERY_AVAILABLE_SKILLS);
	const { skills } = data?.skillOptions || [];

	const { initialSelectedSkills } = useLocalSearchParams();
	const [setSkills] = useMutation(SET_SKILLS);

	const handleSubmitSkills = async () => {
		await setSkills({
			variables: {
				skills: selectedSkills,
			},
		});

		initialSelectedSkills ? router.back() : router.push("preferredRoles");
	};

	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

	useEffect(() => {
		if (initialSelectedSkills) {
			const parsedSkills = Array.isArray(initialSelectedSkills)
				? initialSelectedSkills[0]
				: initialSelectedSkills;
			setSelectedSkills(JSON.parse(parsedSkills) || []);
		}
	}, [initialSelectedSkills]);

	const toggleSkill = (skill: string) => {
		if (selectedSkills.includes(skill)) {
			setSelectedSkills(selectedSkills.filter((s) => s !== skill));
		} else {
			setSelectedSkills([...selectedSkills, skill]);
		}
	};

	return (
		<ScreenContainer>
			<KeyboardDismissableView>
				<ScrollView>
					<PaddedContainer>
						<NavBackButton />
						<Title>🕵️ Add skills</Title>
						<Subtitle>
							We will help you apply to roles that require specific experience.
						</Subtitle>

						<Container>
							{skills?.map((element, index) => (
								<SelectableButton
									key={index}
									title={element}
									onPress={() => toggleSkill(element)}
									selected={selectedSkills.includes(element)}
								/>
							))}
						</Container>

						<MainButtonContainer>
							<MainButton
								text={initialSelectedSkills ? "Save" : "Next"}
								onPress={() => handleSubmitSkills()}
							/>
						</MainButtonContainer>
					</PaddedContainer>
				</ScrollView>
			</KeyboardDismissableView>
		</ScreenContainer>
	);
};

const MainButtonContainer = styled.View`
	padding-top: 90px;
`;

const Container = styled.View`
	margin-top: 30px;
	row-gap: 20px;
`;

export default AddSkills;
