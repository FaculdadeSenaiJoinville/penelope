import { ActionButtonConfig } from '../components/o-action-buttons.type';
import { BotContent } from './content.type';

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

	contents?: BotContent[];

	constructor() {
		this.name = '';
		this.dialogflow_id = '';
		this.training_phrases = [];
		this.priority = 0;
		this.end_interaction = false;
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

	public dialogflow_id: string;

	public training_phrases: string[];

	public priority: number;

	public end_interaction: boolean;

	public contents?: BotContent[];

	constructor(intent?: BotIntent) {
		this.name = intent ? intent.name : '';
		this.dialogflow_id = intent ? intent.dialogflow_id : '';
		this.training_phrases = intent ? intent.training_phrases : [];
		this.priority = intent ? intent.priority : 0;
		this.end_interaction = intent ? intent.end_interaction : false;
		this.contents = intent ? intent.contents : [];
	}
};

export class IntentDetails {
	public name: string;

	public dialogflow_id: string;

	public training_phrases: string[];

	public priority: number;

	public end_interaction: boolean;

	public contents?: BotContent[];

	constructor(intent?: BotIntent) {
		this.name = intent ? intent.name : '';
		this.dialogflow_id = intent ? intent.dialogflow_id : '';
		this.training_phrases = (intent ? intent.training_phrases : []);
		this.priority = intent ? intent.priority : 0;
		this.end_interaction = intent ? intent.end_interaction : false;
		this.contents = intent ? intent.contents : [];
	}
}
