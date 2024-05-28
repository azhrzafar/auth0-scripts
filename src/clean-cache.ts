import 'dotenv/config';
import { createClient } from 'redis';

const scanAndCleanCache = async (pattern: string) => {
	const client = await createClient({
		url: process.env.REDIS_URL,
	})
		.on('error', (err) => console.log('Redis Client Error', err))
		.connect();

	let cursor = 0;
	const response = await client.scan(cursor, { MATCH: pattern, COUNT: 1000 });
	console.log('Keys to delete', response?.keys);

	if (response?.keys) {
		let i = 1;
		for (const key of response.keys) {
			console.log(`Deleting key "${key}" - ${i} of ${response.keys.length}`);
			await client.del(key);
		}
	}

	client.quit();
};

scanAndCleanCache('*AUTH0_USER_*');
