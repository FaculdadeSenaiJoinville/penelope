import { Middleware } from '@nuxt/types';

const auth: Middleware = (context) => {
	enum UserType {
		ADMIN = 'ADMIN',
		PROFESSOR = 'PROFESSOR',
		STUDENT = 'STUDENT'
	}

	const user = context.$auth.user;
	const professorRoutes = ['/professor'];
	const studentRoutes = ['/student'];

	if (!user || !context.$auth.loggedIn) {
		context.redirect('/login');
	}

	if (user?.type === UserType.ADMIN) {
		if (!professorRoutes.includes(context.route.path)) {
			context.redirect('/');
		}
	} else if (user?.type === UserType.STUDENT) {
		if (!studentRoutes.includes(context.route.path)) {
			context.redirect('/');
		}
	}
};

export default auth;
