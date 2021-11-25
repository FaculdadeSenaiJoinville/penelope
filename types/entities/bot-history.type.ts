import { ActionButtonConfig } from '../components/o-action-buttons.type';

export type BotHistory = {
	id: string;

	user_name: string;

	user_message: string;

	bot_response: string[];

	chat_id: number;

	created_at: Date;
};

export type BotHistoryWithActions = BotHistory & {
	actionButtons?: ActionButtonConfig[];
};

export class BotHistoryDetails {
	public user_name: string;

	public user_message: string;

	public bot_response: string[];

	public chat_id: number;

	public created_at: Date;

	constructor(botHistory?: BotHistory) {
		this.user_name = botHistory ? botHistory.user_name : '';
		this.user_message = botHistory ? botHistory.user_message : '';
		this.bot_response = botHistory ? botHistory.bot_response : [];
		this.chat_id = botHistory ? botHistory.chat_id : 0;
		this.created_at = botHistory ? botHistory.created_at : new Date();
	}
}
