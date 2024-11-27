export type DepartmentKey = 'e' | 'm' | 'c' | 'a';
export type SexKey = 'male' | 'female' | 'both';
export type GradeKey =
	| 'grade-1'
	| 'grade-2'
	| 'grade-3'
	| 'grade-4'
	| 'grade-5'
	| 'grade-6'
	| 'grade-7';

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
	department: DepartmentKey[];
	sex: SexKey;
	grade: GradeKey[];
	is_public: boolean;
	author_id: string;
	created_at: Date;
	updated_at: Date;
	teamId: string;
	owner: string;
	contactFormURL: string;
}
