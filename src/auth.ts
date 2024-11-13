import { FirestoreAdapter } from '@auth/firebase-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { firestore } from './lib/firebase';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	adapter: FirestoreAdapter(firestore),
});
