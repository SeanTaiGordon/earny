import React, { useRef, useState } from "react";
import {
	Button,
	NavBackButton,
	PaddedContainer,
	ProgressBar,
	ScreenContainer,
	Subtitle,
	Title,
} from "../components";
import CheckIcon from "react-native-bootstrap-icons/icons/check";
import CrossIcon from "react-native-bootstrap-icons/icons/x";
import styled from "styled-components/native";
import { Camera, CameraType, Constants } from "expo-camera";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Video, ResizeMode } from "expo-av";
import RefreshIcon from "react-native-bootstrap-icons/icons/arrow-clockwise";
import { ScrollView } from "react-native";
import { manageFileUpload } from "../util";
import { getAuth } from "firebase/auth";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "expo-router";

const MAX_RECORDING_SECONDS = 60;

const CAMERA_RECORD_SETTINGS = {
	quality: Constants.VideoQuality["720p"],
	maxDuration: MAX_RECORDING_SECONDS,
	maxFileSize: MAX_RECORDING_SECONDS * 1024 * 1024,
};

const SUBMIT_VIDEO_MUTATION = gql`
	mutation Mutation($url: String!) {
		submitVideo(url: $url)
	}
`;

const RecordVideo = () => {
	const [cameraPermission, requestCameraPermission] =
		Camera.useCameraPermissions();
	const [microphonePermission, requestMicrophonePermission] =
		Camera.useMicrophonePermissions();
	const cameraRef = useRef<Camera>(null);
	const [isRecording, setIsRecording] = useState(false);
	const [recordingIsComplete, setRecordingIsComplete] = useState(false);
	const [videoUri, setVideoUri] = useState<string>();
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const auth = getAuth();
	const [submitVideo] = useMutation(SUBMIT_VIDEO_MUTATION);
	const navigation = useNavigation();

	const onUploadComplete = async (url: string) => {
		console.log("Uploading to GraphQL with URL:", url);
		try {
			const response = await submitVideo({
				variables: { url },
			});
			console.log("Video submitted successfully:", response.data.submitVideo);
		} catch (error) {
			console.error("Error submitting video:", error);
		}
	};

	const onUploadFail = (error: Error) => {
		alert("Upload failed, try again!");
		setIsUploading(false);
		console.error("Upload failed", error);
	};

	const handleUploadPress = () => {
		if (videoUri) {
			setIsUploading(true); // Start the upload process
			setUploadProgress(0); // Reset progress
			manageFileUpload(videoUri, auth.currentUser.uid, {
				onProgress: setUploadProgress, // Pass the setUploadProgress function to manageFileUpload
				onComplete: (downloadURL) => {
					onUploadComplete(downloadURL);
					// So the use can see the finialised upload progress before navigating back
					setTimeout(() => {
						navigation.goBack();
					}, 1000);
				},
				onFail: (error) => {
					onUploadFail(error);
					setIsUploading(false); // Ensure to set uploading false on fail too
				},
			});
		}
	};

	const toggleRecording = async () => {
		if (!isRecording) {
			// Start recording
			if (cameraRef.current) {
				setIsRecording(true);
				try {
					const video = await cameraRef.current.recordAsync(
						CAMERA_RECORD_SETTINGS
					);
					console.log(video.uri);
					setVideoUri(video?.uri);
					setRecordingIsComplete(true);
				} catch (error) {
					console.error("Recording failed", error);
				}
			}
		} else {
			// Stop recording
			if (cameraRef.current) {
				cameraRef.current.stopRecording();
				setIsRecording(false);
			}
		}
	};

	if (!microphonePermission?.granted || !cameraPermission?.granted) {
		return (
			<ScreenContainer>
				<PaddedContainer>
					<NavBackButton />
					<BodyContainer>
						<Title>
							We need your permission for your microphone and camera
						</Title>
						<Button
							onPress={requestMicrophonePermission}
							backgroundColor={microphonePermission?.granted && "#badc58"}
							title={
								microphonePermission?.granted
									? "Microphone access granted"
									: "Grant microphone permission"
							}
							Icon={microphonePermission?.granted ? CheckIcon : CrossIcon}
						/>
						<Button
							onPress={requestCameraPermission}
							backgroundColor={cameraPermission?.granted && "#badc58"}
							title={
								cameraPermission?.granted
									? "Camera access granted"
									: "Grant camera permission"
							}
							Icon={cameraPermission?.granted ? CheckIcon : CrossIcon}
						/>
					</BodyContainer>
				</PaddedContainer>
			</ScreenContainer>
		);
	}

	return (
		<ScreenContainer>
			<ScrollView>
				<PaddedContainer>
					<CameraBodyContainer>
						<NavBackButton />

						<StyledTitle>Record icebreaker!</StyledTitle>
						<Subtitle>
							Would you choose a beach, city or mountain break - and why?
						</Subtitle>

						{recordingIsComplete && videoUri ? (
							<>
								<PlaybackView
									source={{
										uri: videoUri,
									}}
									useNativeControls
									resizeMode={ResizeMode.COVER}
									isLooping
									shouldPlay
								/>

								{isUploading ? (
									<ProgressBar value={uploadProgress} maxValue={100} />
								) : (
									<>
										<Button
											title="Submit"
											backgroundColor="#badc58"
											onPress={handleUploadPress}
											Icon={CheckIcon}
										/>
										<Button
											title="Retake"
											onPress={() => {
												setRecordingIsComplete(false);
												setVideoUri(undefined);
											}}
											Icon={RefreshIcon}
										/>
									</>
								)}
							</>
						) : (
							<>
								<CameraView type={CameraType.front} ref={cameraRef} />
								<RecordButton onPress={toggleRecording}>
									{isRecording && (
										<AnimatedCircularProgress
											size={100}
											width={10}
											fill={100}
											tintColor="red"
											onAnimationComplete={toggleRecording}
											backgroundColor="#888"
											duration={MAX_RECORDING_SECONDS * 1000}
											style={{ alignSelf: "center", marginTop: -10 }}
										/>
									)}
								</RecordButton>
							</>
						)}
					</CameraBodyContainer>
				</PaddedContainer>
			</ScrollView>
		</ScreenContainer>
	);
};

export default RecordVideo;

const BodyContainer = styled.View`
	margin-top: 50px;
	gap: 20px;
`;

const CameraBodyContainer = styled.View`
	gap: 20px;
`;

const StyledTitle = styled(Title)`
	margin-top: 0px;
	margin-bottom: 0px;
`;

const PlaybackView = styled(Video)`
	width: 100%;
	height: 400px;
	border-radius: 10px;
	overflow: hidden;
`;

const CameraView = styled(Camera)`
	width: 100%;
	height: 400px;
	border-radius: 10px;
	overflow: hidden;
`;

const RecordButton = styled.TouchableOpacity`
	width: 100px;
	height: 100px;
	border: 10px solid #888;
	border-radius: 50%;
	align-self: center;
`;
