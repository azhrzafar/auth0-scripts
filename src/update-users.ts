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
		console.log(`Updating user ${index + 1} of ${users.length}`);
		const payload: UpdateUserData = {
			given_name: user.user_metadata?.given_name ?? '',
			family_name: user.user_metadata?.family_name ?? '',
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
