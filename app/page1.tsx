import React, { useState } from "react";
import {
	FormCheckboxLabelInput,
	FormTextInput,
	PaddedContainer,
	ScreenContainer,
	Title,
} from "../components/base";
import {
	ColorScrollSelector,
	EmojiScrollSelector,
	MainButton,
	NavBackButton,
} from "../components";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

const Page = () => {
	const [selectedColor, setSelectedColor] = useState<String>("#d9d9d9");
	const [selectedIcon, setSelectedIcon] = useState<String>("🧑‍💻");
	return (
		<ScrollView>
			<ScreenContainer>
				<KeyboardAvoidingView>
					<PaddedContainer>
						<NavBackButton />

						<Title>📝 Let’s create your profile</Title>
						<EmojiScrollSelector
							selectorColor={selectedColor}
							getSelectedIcon={selectedIcon}
							onIconSelect={setSelectedIcon}
						/>
						<ColorScrollSelector
							onColorChange={setSelectedColor}
							getColor={selectedColor}
						/>
						<FormTextInput placeholder="Full name*" />
						<FormTextInput placeholder="Date of birth*" />
						<FormTextInput placeholder="Email*" />
						<FormTextInput placeholder="Phone Number*" />
						<FormCheckboxLabelInput
							label={"Email me about my applications"}
							defaultTrue
						/>
						<FormCheckboxLabelInput
							label={"Phone me about my applications"}
							defaultTrue
						/>
						<FormCheckboxLabelInput
							label={"Agree to privacy policy"}
							defaultTrue
						/>
						<MainButton text="Next" disabled={true} />
					</PaddedContainer>
				</KeyboardAvoidingView>
			</ScreenContainer>
		</ScrollView>
	);
};

export default Page;
