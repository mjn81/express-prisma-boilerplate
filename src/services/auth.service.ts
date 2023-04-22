import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { hash, verify } from 'argon2';

import type {
	IDevice,
	IToken,
	Login,
	Register,
	TokenType,
} from '../interfaces';

import Logger from '../global/logger';
import { BadRequestError, UnauthorizedError } from '../errors';
import { getEnv } from '../utils';
import { prisma } from '../config';

class AuthService {
	constructor() {
		Logger.info('AuthService instantiated');
	}

	public async login({ email, password }: Login) {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				email: email,
			},
		});

		const validPassword = await verify(user.password, password);

		if (!validPassword) throw new UnauthorizedError('Invalid Credentials');

		return user;
	}

	public async register({ email, password, username }: Register) {
		const foundUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (foundUser) {
			throw new BadRequestError('user exist');
		}
		const hashedPassword = await hash(password);
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				username,
			},
		});

		return user;
	}

	public async generateToken(data: IToken, deviceName: string) {
		const foundTokens = await prisma.token.findFirst({
			where: {
				AND: [
					{
						device: {
							name: deviceName,
						},
					},
					{
						user: {
							id: data.id,
						},
					},
				],
			},
		});

		if (foundTokens) {
			try {
				const isValid = this.verifyToken(foundTokens.refresh, 'refresh');
				if (!!isValid) {
					return {
						access: foundTokens.access,
						refresh: foundTokens.refresh,
					};
				}
			} catch (err) {
				if (err instanceof TokenExpiredError) {
					await prisma.token.delete({
						where: {
							id: foundTokens.id,
						},
					});
				}
			}
		}

		const access = this.createToken(data, 'access');

		const refresh = this.createToken(data, 'refresh');

		const token = await prisma.token.create({
			data: {
				access,
				refresh,
				user: {
					connect: {
						id: data.id,
					},
				},
				device: {
					create: {
						name: deviceName,
					},
				},
			},
		});
		return { access: token.access, refresh:token.refresh };
	}

	public async verifyAndCheckToken(access: string): Promise<IToken> {
		const decoded = this.verifyToken(access, 'access');
		const foundToken = await prisma.token.findUniqueOrThrow({
			where: {
				access,
			},
			include: {
				user: {
					select: {
						id: true,
					},
				},
			},
		});
		return {
			id: foundToken.user.id,
			username: decoded.username,
		};
	}

	public verifyToken(token: string, type: TokenType) {
		const key =
			type === 'access'
				? getEnv('TOKEN_SECRET')
				: getEnv('REFRESH_TOKEN_SECRET');
		return jwt.verify(token, key) as IToken;
	}

	public async refreshToken(refresh: string, data: IToken) {
		const access = this.createToken(data, 'access');
		const updatedToken = await prisma.token.update({
			where: {
				refresh,
			},
			data: {
				access,
			},
		});

		return {
			access: updatedToken.access,
			refresh: updatedToken.refresh,
		};
	}

	public async logout(refresh: string) {
		return await prisma.token.delete({
			where: {
				refresh,
			},
		});
	}

	public async logoutAll(uid: string) {
		return await prisma.token.deleteMany({
			where: {
				user: {
					id: uid,
				},
			},
		});
	}

	public async updatePassword(uid: string, password: string) {
		const hashedPassword = await hash(password);
		return await prisma.user.update({
			where: {
				id: uid,
			},
			data: {
				password: hashedPassword,
			},
		});
	}

	public async getAllTokensAndDevices(uid: string) {
		const tokens = await prisma.token.findMany({
			where: {
				user: {
					id: uid,
				},
			},
			select: {
				access: true,
				refresh: true,
				id: true,
				device: {
					select: {
						name: true,
					},
				},
			},
		});

		return tokens;
	}

	private createToken(data: IToken, type: TokenType) {
		const secret =
			type === 'access'
				? getEnv('TOKEN_SECRET')
				: getEnv('REFRESH_TOKEN_SECRET');
		const expiration =
			type === 'access'
				? getEnv('TOKEN_EXIPIRATION_DATE')
				: getEnv('REFRESH_TOKEN_EXIPIRATION_DATE');
		return jwt.sign(data, secret, {
			expiresIn: expiration,
		});
	}
}

export const authService = new AuthService();
