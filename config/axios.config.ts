import { AxiosOptions } from '@nuxtjs/axios';

const development = process.env.NODE_ENV !== 'production';

const axios: AxiosOptions = {
	baseURL: development ? 'http://localhost:3000' : 'http://localhost:3000'
};

export default axios;
