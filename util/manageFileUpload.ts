import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

export const manageFileUpload = async (
	url: string,
	userId: string,
	{
		onProgress,
		onComplete,
		onFail,
	}: {
		onProgress?: (progress: number) => void;
		onComplete?: (url: string) => void;
		onFail?: (error: Error) => void;
	}
) => {
	const storage = getStorage();
	const videoName = `profiles/${userId}/videos/${Date.now()}.mp4`;
	const storageRef = ref(storage, videoName);

	try {
		const response = await fetch(url);
		const fileBlob = await response.blob();
		const uploadTask = uploadBytesResumable(storageRef, fileBlob);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				if (onProgress) {
					onProgress(progress);
				}
			},
			(error) => {
				onFail && onFail(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					onComplete && onComplete(downloadURL);
				});
			}
		);
	} catch (error) {
		onFail && onFail(error);
	}
};
