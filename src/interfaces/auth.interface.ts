export interface IToken {
	id: string;
	username: string;
}

export interface IUser {
	id: string;
	username: string;
	email: string;
	password: string;
}

export type Register = Omit<IUser, 'id'>;
export type Login = Omit<Register, 'username'>;

export type TokenType = 'access' | 'refresh';

export interface IDevice {
	id: string;
	name: string;
}

