import { DefaultSession } from 'next-auth';

interface IUser {
	at_hash?: string;
	aud?: string;
	azp?: string;
	email: string;
	emailVerified?: boolean | null;
	email_verified?: boolean;
	exp?: number;
	family_name?: string;
	given_name?: string;
	hd?: string;
	iat?: number;
	iss?: string;
	id: string;
	name?: string | null;
	picture?: string | null;
	sub?: string;
}

declare module 'next-auth' {
	interface Session {
		user: IUser & DefaultSession['user'];
	}
	interface User extends IUser {}
}
