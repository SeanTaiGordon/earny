import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FormTextInput } from "./base";
import { Keyboard, Pressable, View } from "react-native";

const MIN_AGE_OF_APPLICANT = 18;

interface Props {
	getDate: (date?: Date) => void;
}

export const DatePicker = ({ getDate }: Props) => {
	const [date, setDate] = useState<Date>();
	const [open, setOpen] = useState(false);
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - MIN_AGE_OF_APPLICANT);

	useEffect(() => {
		getDate(date);
		console.log(date);
	}, [date]);

	return (
		<View>
			<FormTextInput
				onPressOut={() => {
					Keyboard.dismiss();
					setOpen(true);
				}}
				placeholder="Date of birth*"
				editable={false}
				value={date ? date.toDateString() : ""}
			/>

			<DateTimePickerModal
				mode="date"
				isVisible={open}
				date={date}
				onConfirm={(date) => {
					setOpen(false);
					setDate(date);
				}}
				onCancel={() => {
					setOpen(false);
				}}
				minimumDate={new Date(1950, 0, 1)}
				maximumDate={maxDate}
			/>
		</View>
	);
};
