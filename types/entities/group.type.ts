import { ActionButtonConfig } from '../components/o-action-buttons.type';
import { User } from '.';

export class Group {
	id?: string;

	name: string;

	description: string;

	members: User[];

	created_at: Date;

	updated_at: Date;

	created_by?: string;

	updated_by?: string;

	constructor(group: Group)
	{
		this.id = group ? group.id : '';
		this.name = group ? group.name : '';
		this.description = group ? group.description : '';
		this.created_at = group ? group.created_at : new Date();
		this.updated_at = group ? group.updated_at : new Date();
		this.created_by = group ? group.created_by : '';
		this.updated_by = group ? group.updated_by : '';
	}

};

export type GroupWithActions = Group & {
	actionButtons?: ActionButtonConfig[];
};

export type GroupUpdate = {

	name: string;

	description: string;

	members: User[];

	members_to_remove: User[];
}

export class GroupDetails {
	public name: string;

	public description: string;

	public members: User[];

	constructor(group?: Group) {
		this.name = group ? group.name : '';
		this.description = group ? group.description : '';
		this.members = group ? group.members : [];
	}
}

export class EditGroup {
	public name: string;

	public description: string;

	public members: User[];

	public members_to_remove: User[];

	constructor(group?: GroupUpdate) {
		this.name = group ? group.name : '';
		this.description = group ? group.description : '';
		this.members = group ? group.members : [];
		this.members_to_remove = group ? group.members_to_remove : [];
	}
};

export class NewGroup {
	public name: string;

	public description: string;

	public members: User[];

	constructor() {
		this.name = '';
		this.description = '';
		this.members = [];
	}
};
