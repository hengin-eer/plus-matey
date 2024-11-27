export interface EventData {
	id: string;
	title: string;
	summary: string;
	thumbnail?: {
		base64: string;
		name: string;
	} | null;
	close_at: string;
	number_recruited: number;
	held_at: string;
	department: string[];
	sex: string;
	grade: string[];
	is_public: boolean;
	author_id: string;
	created_at: Date;
	updated_at: Date;
	teamId: string;
	owner: string;
	contactFormURL: string;
}
