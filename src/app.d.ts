// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient, SubCategory } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			currUser: {
				id: number;
				createdAt: Date;
				updatedAt: Date;
				role: $Enums.Role;
				firstName: string | null;
				lastName: string | null;
				email: string;
				password: string;
				phone: number | null;
				address: string | null;
			};
		}
		interface Category {
			id: string;
			name: string;
			subCategories: SubCategory[];
		}
		interface SubCategory {
			id: string;
			name: string;
			categoryId: string;
		}
		// interface PageData {}
		// interface Platform {}
	}
	var prisma: PrismaClient;
}

export {};
