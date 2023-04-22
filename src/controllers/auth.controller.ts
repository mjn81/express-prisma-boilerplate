import { Request, Response } from 'express';
import { HTTP_CODES } from '../constants';
import { authService, userService } from '../services';
import { getUser } from '../utils';

class AuthController {
	async login(req: Request, res: Response) {
		const { email, password, device } = req.body;
		const user = await authService.login({
			email,
			password,
		});
		const token = await authService.generateToken(
			{
				id: user.id,
				username: user.username,
			},
			device
		);

		res.json(token);
	}

	async register(req: Request, res: Response) {
		const { email, password, username, device } = req.body;
		console.log(device)
		const user = await authService.register({
			email,
			password,
			username,
		});

		const token = await authService.generateToken(
			{
				id: user.id,
				username: user.username,
			},
			device
		);

		res.json(token);
	}

	async profile(req: Request, res: Response) {
		const uid = getUser(req).id;
		const user = await userService.getUserById(uid);
		res.json(user);
	}

	async logout(req: Request, res: Response) {
		const uid = getUser(req).id;
		await authService.logout(uid);
		res.json({
			message: 'Logged out',
			code: HTTP_CODES.OK,
		});
	}

	async logoutAll(req: Request, res: Response) {
		const uid = getUser(req).id;
		await authService.logoutAll(uid);
		res.json({
			message: 'Logged out of all account',
			code: HTTP_CODES.OK,
		});
	}

	async forgetPassword(req: Request, res: Response) {}

	async resetPassword(req: Request, res: Response) {}

	public async devices(req: Request, res: Response) {
		const uid = getUser(req).id;
		const devices = await authService.getAllTokensAndDevices(uid);
		res.json(devices);
	}
}

export const authController = new AuthController();
