'use server';

import { signIn, signOut } from '@/auth';
import console from 'console';
import { redirect } from 'next/navigation';

export async function signInAction() {
	try {
		await signIn('google', {
			redirectTo: '/',
		});
	} catch (error) {
		console.error('Sign out error:', error);
		throw error;
	}
}

export async function signOutAction() {
	try {
		await signOut({
			redirect: false,
		});
		redirect('/');
	} catch (error) {
		console.error('Signout error:', error);
		throw error;
	}
}
