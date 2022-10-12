import { Status, StatusType, Trail } from '.';
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

	groups: Group[];

	trails: Trail[];

	constructor(user: User) {
		this.id = user ? user.id: '';
		this.name = user ? user.name: '';
		this.email = user ? user.email : '';
		this.type = user ? user.type : '' as UserType;
		this.active = user ? user.active : true;
		this.groups = user ? user.groups : [];
		this.trails = user ? user.trails : [];
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

	public groups: Group[];

	public trails: Trail[];

	constructor() {
		this.name = '';
		this.email = '';
		this.type = '' as UserType;
		this.password = '';
		this.confirm_password = '';
		this.groups = [];
		this.trails = [];
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

	public groups: Group[];

	public groups_to_leave?: Group[];

	public trails: Trail[];

	public trails_to_leave?: Trail[];

	constructor(user?: User) {
		this.name = user ? user.name : '';
		this.email = user ? user.email : '';
		this.type = (user ? user.type : '') as UserType;
		this.active = user ? user.active : true;
		this.groups = user ? user.groups : [];
		this.trails = user ? user.trails : [];

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

	public groups: Group[];

	public trails: Trail[];

	constructor(user?: User) {
		this.name = user ? user.name : '';
		this.email = user ? user.email : '';
		this.type = (user ? user.type : '') as UserType;
		this.active = user ? user.active : true;
		this.groups = user ? user.groups : [];
		this.trails = user ? user.trails : [];
	}
}

export type ProfileGroup = {
	name: string;

	description: string;
}

export type ProfileTrail = {
	name: string;
	description: string;
	icon: string;
	color: string;
}

export class Profile {
	name?: string;

	id?: string;

	email?: string;

	type?: UserType;

	groups?: ProfileGroup[]

	trails?: ProfileTrail[]

	constructor(user?: User) {
		this.name = user?.name;
		this.email = user?.email;
		this.type = user?.type;
		this.groups = user?.groups as ProfileGroup[];
		this.trails = user?.trails as ProfileTrail[];
	}

	concatTrails(trails : Trail[])
	{
		this.trails = [...this.trails, ...new Set(trails.filter(trail => trail.status == 'PUBLISHED' as StatusType))];
	}
}
