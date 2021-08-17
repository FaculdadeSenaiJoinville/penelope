export enum UserType {
	ADMIN = 'ADMIN',
	PROFESSOR = 'PROFESSOR',
	STUDENT = 'STUDENT'
}

export class NewUser {
	public name: string;

	public email: string;

	public type: UserType;

	public password: string;

	public confirm_password: string;

	constructor() {
		this.name = '';
		this.email = '';
		this.type = '' as UserType;
		this.password = '';
		this.confirm_password = '';
	}
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
