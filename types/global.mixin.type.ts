export type Messages = {
	requestFailed: (error: any) => void;
	requestSuccess: (response: any) => void;
	success: (message: string) => void;
	error: (message: string) => void;
};

export type ModalConfigObject = {
	modal: string,
	[key: string]: string;
};

export type AxiosConfigObject = {
	data?: Object;
	params?: Object;
};

export type Api = {
	get: (endpoint: string, query?: Object) => Promise<any>;

	post: (endpoint: string, data: Object, query?: Object) => Promise<any>;

	put: (endpoint: string, data: Object, query?: Object) => Promise<any>;

	delete: (endpoint: string, query?: Object) => Promise<any>;
};
