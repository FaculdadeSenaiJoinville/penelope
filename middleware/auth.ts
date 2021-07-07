import { Middleware } from '@nuxt/types';

export const auth: Middleware = (context) => {
	const user = context.$auth.user;
	const professorRoutes = ['/professor'];
	const studentRoutes = ['/student'];

	if (!user || !context.$auth.loggedIn) {
		context.redirect('/login');
	}

	if (user?.type === 'ADMIN') {
		if (!professorRoutes.includes(context.route.path)) {
			context.redirect('/');
		}
	} else if (user?.type === 'STUDENT') {
		if (!studentRoutes.includes(context.route.path)) {
			context.redirect('/');
		}
	}
};
