import colors from 'colors';
import { LOCALE } from '../constants';



class Logger {
	private static _instance: Logger;

	private constructor() {}

	public static getInstance(): Logger {
		if (!this._instance) {
			this._instance = new Logger();
		}
		return this._instance;
	}

	private getTime() {
		const date = new Date();

		return `${date.getHours().toLocaleString(LOCALE, {
			minimumIntegerDigits: 2,
		})}:${date.getMinutes().toLocaleString(LOCALE, {
			minimumIntegerDigits: 2,
		})}:${date.getSeconds().toLocaleString(LOCALE, {
			minimumIntegerDigits: 2,
		})}`;
	}

	public error(...message: any[]) {
		console.error(
			`[${colors.red('Error')}] ${colors.bold(this.getTime())}`,
			...message
		);
	}
	public info(...message: any[]) {
		console.info(
			`[${colors.blue('Info')}] ${colors.bold(this.getTime())}`,
			...message
		);
	}
	public success(...message: any[]) {
		console.log(
			`[${colors.green('Success')}] ${colors.bold(this.getTime())}`,
			...message
		);
	}
	public warning(...message: any[]) {
		console.warn(
			`[${colors.yellow('Warning')}] ${colors.bold(this.getTime())} :`,
			...message
		);
	}

	public stringError(message: string) {
		return colors.red(message);
	}
}

export default Logger.getInstance();
