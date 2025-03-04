import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { RequestEvent } from '@sveltejs/kit';

// Define Actions type since we can't import from ./$types
type Actions = {
	[key: string]: (event: RequestEvent) => Promise<any>;
};

export const load = async (event: RequestEvent) => {
	if (event.locals.user) {
		return redirect(302, '/app');
	}
	return {};
};

export const actions: Actions = {
	login: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!validateEmail(email)) {
			return fail(400, { message: 'Invalid email format' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}

		const results = await db
			.select()
			.from(table.user)
			.where(eq(table.user.email, email as string));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect email or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password as string, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect email or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		// Return success instead of redirecting immediately
		return {
			success: true,
			message: 'Login successful! Redirecting...',
			redirectTo: '/app'
		};
	},
	register: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const passwordConfirm = formData.get('passwordConfirm');
		const name = formData.get('name') || email;

		if (!validateEmail(email)) {
			return fail(400, { message: 'Invalid email format' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}
		if (password !== passwordConfirm) {
			return fail(400, { message: 'Passwords do not match' });
		}
		if (!validateName(name)) {
			return fail(400, { message: 'Please provide a valid name' });
		}

		// Check if user already exists
		const existingUsers = await db
			.select()
			.from(table.user)
			.where(eq(table.user.email, email as string));
			
		if (existingUsers.length > 0) {
			return fail(400, { message: 'An account with this email already exists' });
		}

		const passwordHash = await hash(password as string, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		try {
			// Using the schema's default UUID generation for id
			await db.insert(table.user).values({ 
				email: email as string, 
				name: name as string, 
				passwordHash 
			});

			// Get the newly created user to get the ID
			const results = await db
				.select()
				.from(table.user)
				.where(eq(table.user.email, email as string));
			
			const newUser = results.at(0);
			if (!newUser) {
				return fail(500, { message: 'Failed to create user' });
			}

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, newUser.id);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			
			// Return success instead of redirecting immediately
			return {
				success: true,
				message: `Welcome to The Fridge, ${name}! Your account has been created.`,
				redirectTo: '/app'
			};
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'An error has occurred' });
		}
	},
};

function validateEmail(email: unknown): email is string {
	return (
		typeof email === 'string' &&
		email.length >= 3 &&
		email.length <= 255 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	);
}

function validatePassword(password: unknown): password is string {
	return (
		typeof password === 'string' &&
		password.length >= 6 &&
		password.length <= 255
	);
}

function validateName(name: unknown): name is string {
	return (
		typeof name === 'string' &&
		name.length >= 1 &&
		name.length <= 100
	);
}
