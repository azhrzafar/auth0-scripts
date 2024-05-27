import { GetUsers200ResponseOneOfInner, ManagementClient } from 'auth0';

export interface UpdateUserData {
	family_name: string;
	given_name: string;
	name: string;
	user_metadata: {
		family_name?: string | null;
		given_name?: string | null;
		tenant_id?: string;
	};
}

export class AuthManagementService {
	private auth0management: ManagementClient;

	constructor() {
		const optionsApi = {
			domain: process.env.AUTH0_DOMAIN,
			audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
			clientId: process.env.AUTH0_SYSTEM_API_CLIENT_ID,
			clientSecret: process.env.AUTH0_SYSTEM_API_CLIENT_SECRET,
		};

		this.auth0management = new ManagementClient(optionsApi);
	}

	async getAllUsers(): Promise<Array<GetUsers200ResponseOneOfInner>> {
		const result = [];
		const pageSize = 100;
		let page = 0;
		while (true) {
			const { data: userProfiles } = await this.auth0management.users.getAll({
				page,
				per_page: pageSize,
			});
			if (userProfiles.length === 0) {
				break;
			}
			result.push(...userProfiles);
			if (userProfiles.length !== pageSize) {
				break;
			}
			page++;
		}

		return result;
	}

	async updateUserId(userId: string, data: any) {
		try {
			await this.auth0management.users.update({ id: userId }, data);
		} catch (error) {
			console.error(`Error updating user ${userId}`, error);
			process.exit(1);
		}
	}
}
