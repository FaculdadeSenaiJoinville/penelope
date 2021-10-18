import { Context } from '@nuxt/types';

export default function({ $axios, $toast }: Context) {
	$axios.onResponse((response) => {
		const code = response?.status;
		const successMessage = response?.data?.message;

		if (successMessage && (code === 200 || code === 201)) {
			$toast.success(successMessage);
		}
	});

	$axios.onError((error) => {
		const errorMessage = error?.response?.data?.message;

		if (error) {
			$toast.error(errorMessage);
		}
	});
}
