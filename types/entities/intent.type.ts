import { ActionButtonConfig } from '../components/o-action-buttons.type';
import { BotContent } from './content.type';
import { User } from '.';

export class BotIntent {
	id?: string;

	name: string;

	dialogflow_id: string;

	training_phrases: string[];

	priority: number;

	end_interaction: boolean;

	created_at?: Date;

	updated_at?: Date;

	created_by?: string;

	updated_by?: string;

	contents: BotContent[];

	message?: string;

	creator: User;

	constructor() {
		this.name = '';
		this.dialogflow_id = '';
		this.training_phrases = [];
		this.priority = 0;
		this.end_interaction = false;
		this.creator = new User(this.creator);
		this.contents = [];
	}
};

export type IntentWithActions = BotContent & {
	actionButtons?: ActionButtonConfig[];
};

export class NewIntent {
	public name: string;

	public training_phrases: string[];

	public message: string;

	public priority: number;

	public end_interaction: boolean;

	public contents?: BotContent[];

	constructor() {
		this.name = '';
		this.training_phrases = [];
		this.message = '';
		this.priority = 0;
		this.end_interaction = false;
		this.contents = [];
	}
}

export class EditIntent {
	public name: string;

	public training_phrases: string[];

	public priority: number;

	public end_interaction: boolean;

	public contents: BotContent[];

	public contents_to_remove: BotContent[];

	public message?: string;

	constructor(intent?: BotIntent) {
		this.name = intent ? intent.name : '';
		this.training_phrases = intent ? intent.training_phrases : [];
		this.priority = intent ? intent.priority : 0;
		this.end_interaction = intent ? intent.end_interaction : false;
		this.contents = intent ? intent.contents : [];
		this.contents_to_remove = [];
		this.message = intent && intent.message ? intent.message : '';
	}
};

export class IntentDetails {
	public name: string;

	public training_phrases: string[];

	public priority: number;

	public created_at?: Date;

	public end_interaction: boolean;

	public contents: BotContent[];

	public message?: string;

	public creator: User;

	constructor(intent?: BotIntent) {
		this.name = intent ? intent.name : '';
		this.training_phrases = (intent ? intent.training_phrases : []);
		this.priority = intent ? intent.priority : 0;
		this.created_at = intent ? intent.created_at : undefined;
		this.end_interaction = intent ? intent.end_interaction : false;
		this.contents = intent ? intent.contents : [];
		this.message = intent ? intent.message : '';
		this.creator = intent ? intent.creator : new User(this.creator);
	}
}
