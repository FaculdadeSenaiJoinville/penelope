export type Messages = {
	requestFailed: (error: any) => void;
	requestSuccess: (response: any) => void;
	success: (message: string) => void;
	error: (message: string) => void;
}

export type ModalConfigObject = {
	modal: string,
	[key: string]: string;
};
