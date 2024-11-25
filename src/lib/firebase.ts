import { initFirestore } from '@auth/firebase-adapter';
import * as admin from 'firebase-admin';
import { cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// const firebaseConfig = {
// 	apiKey: process.env.FB_API_KEY,
// 	authDomain: process.env.FB_AUTH_DOMAIN,
// 	projectId: process.env.FB_PROJECT_ID,
// 	storageBucket: process.env.FB_STORAGE_BUCKET,
// 	messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
// 	appId: process.env.FB_APPID,
// 	measurementId: process.env.FB_MEASUREMENT_ID,
// };

if (!getApps()?.length) {
	admin.initializeApp({
		credential: cert({
			projectId: process.env.FB_PROJECT_ID,
			clientEmail: process.env.FB_CLIENT_EMAIL,
			privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		}),
	});
}

export const db = getFirestore();

// Auth.js用
export const firestore = initFirestore({
	credential: cert({
		projectId: process.env.FB_PROJECT_ID,
		clientEmail: process.env.FB_CLIENT_EMAIL,
		privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
	}),
});
