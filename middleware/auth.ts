import { Middleware } from '@nuxt/types';

export const auth: Middleware = (context) => {
	const user = context.$auth.user;

	const professorRoutes = ['/professor'];
	const studentRoutes = ['/student'];

	if (!user && !context.$auth.loggedIn) {
		context.redirect('/login');
	} else if (user?.type === 'PROFESSOR') {
		if (!professorRoutes.includes(context.from.path)) {
			context.redirect('/');
		}
	} else if (user?.type === 'STUDENT') {
		if (!studentRoutes.includes(context.from.path)) {
			context.redirect('/');
		}
	}
};
