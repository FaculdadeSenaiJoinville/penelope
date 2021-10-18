import { User } from './user.type';

export class Group {
	id?: string;

	name: string;

	description?: string;

	members?: User[];

	constructor() {
		this.name = '';
	}
}
