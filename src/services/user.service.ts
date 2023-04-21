import { prisma } from '../config';
import Logger from '../global/logger';

class UserService {
	constructor() {
		Logger.info('UserService instantiated');
	}

	public async getUserById(id: string) {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				email: true,
				username: true,
				created_at: true,
				updated_at: true,
			},
		});

		return user;
	}
}

export const userService = new UserService();
