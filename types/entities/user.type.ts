export enum UserType {
	ADMIN = 'ADMIN',
	PROFESSOR = 'PROFESSOR',
	STUDENT = 'STUDENT'
}

export type User = {
	id: string;

	name: string;

	email: string;

	password: string;

	active: boolean;

	type: UserType;

	created_at: Date;

	updated_at: Date;

	created_by?: string;

	updated_by?: string;
};
