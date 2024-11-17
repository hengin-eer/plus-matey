import { FirestoreAdapter } from '@auth/firebase-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { firestore } from './lib/firebase';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
			async profile(profile) {
				return { ...profile };
			},
		}),
	],
	adapter: FirestoreAdapter(firestore),
	session: {
		strategy: 'database',
		maxAge: 1 * 24 * 60 * 60,
	},
	callbacks: {
		async signIn({ profile }) {
			return !!profile?.email?.endsWith('@s.akashi.ac.jp');
		},
		async session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
				session.user.image = user.picture;
			}
			return session;
		},
	},
	debug: true,
} satisfies NextAuthConfig);
