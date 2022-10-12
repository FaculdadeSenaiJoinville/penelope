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
export class ProfileTrails {
	trails: Trail[];

	constructor(trail?: Trail[]) {
		this.trails = trail;
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
	
	concat(trails : Trail[])
	{
		this.trails = [...this.trails, ...new Set(trails.filter(trail => trail.status == 'PUBLISHED' as StatusType))];
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

export enum EntityType {
	USER = "USER",
	GROUP = "GROUP"
}

export enum Status {
  ONEDIT = "ONEDIT",
  ONTEST = "ONTEST",
  PUBLISHED = "PUBLISHED"
}

export class AvailableTrail {

	id?: string;
	type: EntityType;
	trails_id: string;
	entity_id: string;
	created_by: string;

	constructor(availableTrail?: AvailableTrail)
	{
		this.type = availableTrail ? availableTrail.type : EntityType.USER;
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
