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

	constructor() {
		this.name = '';
		this.description = '';
		this.status = '' as StatusType;
		this.icon = '';
		this.color = '#A31D1D';
		this.active = true;
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

	constructor(trail?: Trail) {
		this.name = trail ? trail.name : '';
		this.description = trail ? trail.description :'';
		this.status = (trail ? trail.status : '') as StatusType;
		this.icon = trail ? trail.icon : '';
		this.color = trail ? trail.color : '#A31D1D';
		this.active = trail ? trail.active : true;
	}
};

export class TrailStatus {
	public active: boolean;

	constructor(trail?: Trail) {
		this.active = trail ? trail.active : true;
	}
};

export class TrailDetails {
	name: string;

	description: string;

	status: StatusType;

    icon: string;

    color:string;

	active: boolean;

	constructor(trail?: Trail) {
		this.name = trail ? trail.name : '';
		this.description = trail ? trail.description :'';
		this.status = (trail ? trail.status : '') as StatusType;
		this.icon = trail ? trail.icon : '';
		this.color = trail ? trail.color : '#A31D1D';
		this.active = trail ? trail.active : true;
	}
}
