import { ActionButtonConfig } from '../components/o-action-buttons.type';
import { Group } from './group.type';

export enum UserType {
	ADMIN = 'ADMIN',
	PROFESSOR = 'PROFESSOR',
	STUDENT = 'STUDENT'
}

export class User {
	id?: string;

	name: string;

	email: string;

	password?: string;

	active: boolean;

	type: UserType;

	created_at?: Date;

	updated_at?: Date;

	created_by?: string;

	updated_by?: string;

	groups?: Group[];

	constructor() {
		this.name = '';
		this.email = '';
		this.type = '' as UserType;
		this.active = true;
	}
};

export type UserWithActions = User & {
	actionButtons?: ActionButtonConfig[];
};

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

export class EditPassword {
	public password: string;

	public confirm_password: string;

	constructor() {
		this.password = '';
		this.confirm_password = '';
	}
}

export class EditUser {
	public name: string;

	public email: string;

	public type: UserType;

	public active: boolean;

	constructor(user?: User) {
		this.name = user ? user.name : '';
		this.email = user ? user.email : '';
		this.type = (user ? user.type : '') as UserType;
		this.active = user ? user.active : true;
	}
};

export class UserStatus {
	public active: boolean;

	constructor(user?: User) {
		this.active = user ? user.active : true;
	}
};

export class UserDetails {
	public name: string;

	public email: string;

	public type: UserType;

	public active: boolean;

	constructor(user?: User) {
		this.name = user ? user.name : '';
		this.email = user ? user.email : '';
		this.type = (user ? user.type : '') as UserType;
		this.active = user ? user.active : true;
	}
}

export type ProfileGroup = {
	name: string;

	description: string;
}

export class Profile {
	name?: string;

	email?: string;

	type?: UserType;

	groups?: ProfileGroup[]

	constructor(user?: User) {
		this.name = user?.name;
		this.email = user?.email;
		this.type = user?.type;
		this.groups = user?.groups as ProfileGroup[];
	}
}
