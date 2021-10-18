import { GenericObject } from '../global.type';

export type Messages = {
	success: (message: string) => void;
	error: (message: string) => void;
}

export type AxiosConfigObject = {
	data?: GenericObject;
	params?: GenericObject;
}

export type Api = {
	get: (endpoint: string, query?: GenericObject) => Promise<any>;

	post: (endpoint: string, data: GenericObject, query?: GenericObject) => Promise<any>;

	put: (endpoint: string, data: GenericObject, query?: GenericObject) => Promise<any>;

	delete: (endpoint: string, query?: GenericObject) => Promise<any>;
}
