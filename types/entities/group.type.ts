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

export class GroupDetails {
	public name: string;

	public description: string;

	public members: User[];

	constructor(user?: Group) {
		this.name = user ? user.name : '';
		this.description = user ? user.description : '';
		this.members = user ? user.members : [];
	}
}
