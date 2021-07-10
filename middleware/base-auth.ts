import { Middleware } from '@nuxt/types';
import { UserType } from '~/types/entities';

const auth: Middleware = (context) => {
	const user = context.$auth.user;
	const professorRoutes = ['/professor'];
	const studentRoutes = ['/student'];

	if (!user || !context.$auth.loggedIn) {
		context.redirect('/login');
	} else {
		if (context.route.path === '/login') {
			context.redirect('/');
		}

		if (
			(user.type === UserType.PROFESSOR &&
				!professorRoutes.includes(context.route.path)) ||
			(user.type === UserType.STUDENT &&
				!studentRoutes.includes(context.route.path))
		) {
			context.redirect('/');
		}

		context.redirect('/');
	}
};

export default auth;
