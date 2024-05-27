import 'dotenv/config';
import {
	AuthManagementService,
	UpdateUserData,
} from './services/AuthManagementService';

const processUsersUpdate = async () => {
	const authManagementService = new AuthManagementService();
	const users = await authManagementService.getAllUsers();

	if (users.length === 0) {
		console.log('Users not found');
		return;
	}

	let index = 1;

	for (const user of users) {
		console.log(`Updating user ${index++} of ${users.length}`);

		const { user_metadata } = user;
		const given_name = !!user_metadata?.given_name?.trim()
			? user_metadata?.given_name
			: !!user.given_name?.trim()
			? user.given_name
			: user.email.split('@')[0];
		const family_name = !!user_metadata?.family_name?.trim()
			? user_metadata?.family_name
			: !!user.family_name?.trim()
			? user.family_name
			: user.email.split('@')[0];

		const payload: UpdateUserData = {
			given_name,
			family_name,
			name: `${given_name} ${family_name}`,
			user_metadata: {
				given_name: null,
				family_name: null,
			},
		};
		await authManagementService.updateUserId(user.user_id, payload);
	}

	console.log('Users updated successfully!');
};

processUsersUpdate();
