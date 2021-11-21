import { ActionButtonConfig } from '../components/o-action-buttons.type';
import { User } from '.';

export type Group = {
	id: string;

	name: string;

	description: string;

	members: User[];

	created_at: Date;

	updated_at: Date;

	created_by?: string;

	updated_by?: string;
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
