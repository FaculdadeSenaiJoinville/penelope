import { ActionButtonConfig } from '../components/o-action-buttons.type';
import { BotIntent } from './intent.type';

export class BotContent {
	id?: string;

	name: string;

	link: string;

	explanation: string;

	created_at?: Date;

	updated_at?: Date;

	created_by?: string;

	updated_by?: string;

	intents?: BotIntent[];

	constructor() {
		this.name = '';
		this.link = '';
		this.explanation = '';
	}
};

export type ContentWithActions = BotContent & {
	actionButtons?: ActionButtonConfig[];
};

export class NewContent {
	public name: string;

	public link: string;

	public explanation: string;

	constructor() {
		this.name = '';
		this.link = '';
		this.explanation = '';
	}
}

export class EditContent {
	public name: string;

	public link: string;

	public explanation: string;

	public intents?: BotIntent[];

	constructor(content?: BotContent) {
		this.name = content ? content.name : '';
		this.link = content ? content.link : '';
		this.explanation = (content ? content.explanation : '');
	}
};

export class ContentDetails {
	public name: string;

	public link: string;

	public explanation: string;

	constructor(content?: BotContent) {
		this.name = content ? content.name : '';
		this.link = content ? content.link : '';
		this.explanation = (content ? content.explanation : '');
	}
}
