import { Middleware } from '@nuxt/types';
// import { UserType } from '~/types/entities';

// const professorRoutes = ['/professor'];
// const studentRoutes = ['/student'];

const auth: Middleware = (context) => {
	const user = context.$auth.user;
	const currentPath = context.route.path;
	const onlyLoggedOutPaths = [
		'/auth/login',
		'/auth/reset_password',
		'/auth/change_password'
	];
	// const isStudentAndCannotAccessCurrentPath = user && user.type === UserType.STUDENT && !studentRoutes.includes(currentPath);
	// const isProfessorAndCannotAccessCurrentPath = user && user.type === UserType.PROFESSOR && !professorRoutes.includes(currentPath);

	if (!user && !onlyLoggedOutPaths.includes(currentPath)) {
		context.redirect('/auth/login');
	}

	if (user) {
		if (onlyLoggedOutPaths.includes(currentPath)) {
			context.redirect('/');
		}
	}
};

export default auth;
