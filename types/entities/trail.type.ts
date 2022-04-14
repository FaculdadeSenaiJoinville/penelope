import { ActionButtonConfig } from '../components/o-action-buttons.type';

export enum StatusType {	
	ONEDIT = 'Em Edição',
	ONTEST = 'Em Teste',
	PUBLISHED = 'Publicado'

}

export class Trail {
	id?: string;

	name: string;

	descricao: string;

	status: StatusType;

    icon: string;

    color:number;

	active: boolean;

	created_at?: Date;

	updated_at?: Date;

	created_by?: string;

	updated_by?: string;

	constructor() {
		this.name = '';
		this.descricao = '';
		this.status = '' as StatusType;
		this.icon = '';
		this.color = 0;
		this.active = true;
	}
};

export type TrailWithActions = Trail & {
	actionButtons?: ActionButtonConfig[];
};

export class NewTrail {
    id?: string;

	name: string;

	descricao: string;

	status: StatusType;

    icon: string;

    color:number;

	active: boolean;

	created_at?: Date;

	updated_at?: Date;

	created_by?: string;

	updated_by?: string;

	constructor() {
		this.name = '';
		this.descricao = '';
		this.status = '' as StatusType;
		this.icon = '';
		this.color = 0;
		this.active = true;
	}
}

export class EditTrail {
	name: string;

	descricao: string;

	status: StatusType;

    icon: string;

    color:number;

	active: boolean;

	constructor(trail?: Trail) {
		this.name = '';
		this.descricao = '';
		this.status = '' as StatusType;
		this.icon = '';
		this.color = 0;
		this.active = true;
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

	descricao: string;

	status: StatusType;

    icon: string;

    color:number;

	active: boolean;

	constructor(trail?: Trail) {
		this.name = '';
		this.descricao = '';
		this.status = '' as StatusType;
		this.icon = '';
		this.color = 0;
		this.active = true;
	}
}
