export const getEnv = (name: string, defaultValue?: string) => {
	const value = process.env[name];
	if (!value) {
		if (!!defaultValue) return defaultValue;
		throw new Error(`Missing env variable: ${name}`);
	}
	return value;
};

export const envToBoolean = (value: string) => value.toLocaleLowerCase() === 'true'

