import { Middleware } from '@nuxt/types';
// import { UserType } from '~/types/entities';

// const professorRoutes = ['/professor'];
// const studentRoutes = ['/student'];

const auth: Middleware = (context) => {
	const user = context.$auth.user;
	const currentPath = context.route.path;
	// const isStudentAndCannotAccessCurrentPath = user && user.type === UserType.STUDENT && !studentRoutes.includes(currentPath);
	// const isProfessorAndCannotAccessCurrentPath = user && user.type === UserType.PROFESSOR && !professorRoutes.includes(currentPath);

	if (!user && currentPath !== '/auth/login') {
		context.redirect('/auth/login');
	}

	if (user) {
		if (currentPath === '/auth/login') {
			context.redirect('/');
		}
	}
};

export default auth;
