import { Group, User } from '.';
import { ActionButtonConfig } from '../components/o-action-buttons.type';

export enum StatusType {
	ONEDIT = 'Em Edição',
	ONTEST = 'Em Teste',
	PUBLISHED = 'Publicado'

}

export class Trail {
	id?: string;

	name: string;

	description: string;

	status: StatusType;

    icon: string;

    color:string;

	active: boolean;

	created_at?: Date;

	updated_at?: Date;

	created_by?: string;

	updated_by?: string;

	users?: User[];

	users_to_remove: User[];

	groups: Group[];
 	
	groups_to_remove: Group[];
	constructor() {
		this.name = '';
		this.description = '';
		this.status = '' as StatusType;
		this.icon = '';
		this.color = '#A31D1D';
		this.active = true;
		this.users = [];
		this.groups = [];
	}
};

export type TrailWithActions = Trail & {
	actionButtons?: ActionButtonConfig[];
};

export class NewTrail {
    id?: string;

	name: string;

	description: string;

	status: StatusType;

    icon: string;

    color:string;

	active: boolean;

	created_at?: Date;

	updated_at?: Date;

	created_by?: string;

	updated_by?: string;

	users?: User[];

	constructor() {
		this.name = '';
		this.description = '';
		this.status = '' as StatusType;
		this.icon = '';
		this.color = '#A31D1D';
		this.active = true;
		this.users = [];
	}
}

export class EditTrail {
	name: string;

	description: string;

	status: StatusType;

    icon: string;

    color:string;

	active: boolean;

	users: User[];
 	
	users_to_remove: User[];

	groups: Group[];
 	
	groups_to_remove: Group[];

	constructor(trail?: Trail) {
		this.name = trail ? trail.name : '';
		this.description = trail ? trail.description :'';
		this.status = (trail ? trail.status : '') as StatusType;
		this.icon = trail ? trail.icon : '';
		this.color = trail ? trail.color : '#A31D1D';
		this.active = trail ? trail.active : true;
		this.users = trail ? trail.users : [];
		this.groups = trail ? trail.groups : [];
	}
};

export class UserTrails {
	private trails: Trail[];

	constructor(trails?: Trail[]) {
		this.trails = trails;
	}

	get(index: Number) : Trail
	{
		return this.trails[Number(index)];
	}

	add(trail: Trail) {
		if(trail)
		{
			this.trails.push(trail);
		}
	}

	remove(trail: Trail)
	{
		if(trail)
		{
			this.trails = this.trails.filter(t => t !== trail);
		}
	}

	removeByIndex(index: Number)
	{
		if(Number.isInteger(index) && this.trails.length > index)
		{
			this.trails = this.trails.splice(Number(index), 1);
		}
	}
};
export class TrailStatus {
	public active: boolean;

	constructor(trail?: Trail) {
		this.active = trail ? trail.active : true;
	}
};

export enum Type {
	USER = "USER",
	GROUP = "GROUP"
}

export class AvailableTrail {

	id?: string;
	type: Type;
	trails_id: string;
	entity_id: string;
	created_by: string;

	constructor(availableTrail?: AvailableTrail)
	{
		this.type = availableTrail ? availableTrail.type : Type.USER;
		this.trails_id = availableTrail ? availableTrail.trails_id : "";
		this.entity_id = availableTrail ? availableTrail.entity_id : "";
		this.created_by = availableTrail ? availableTrail.created_by : "";
	}


}

export class TrailDetails {
	name: string;

	description: string;

	status: StatusType;

    icon: string;

    color:string;

	active: boolean;

	users: User[];

	users_to_remove: User[];
	
	groups: Group[];
 	
	groups_to_remove: Group[];

	constructor(trail?: Trail) {
		this.name = trail ? trail.name : '';
		this.description = trail ? trail.description :'';
		this.status = (trail ? trail.status : '') as StatusType;
		this.icon = trail ? trail.icon : '';
		this.color = trail ? trail.color : '#A31D1D';
		this.active = trail ? trail.active : true;
		this.users = trail ? trail.users : [];
		this.groups = trail ? trail.groups : [];
	}
}
