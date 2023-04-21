import * as yup from 'yup';

export const loginValidator = yup.object({
	body: yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(8).required(),
		device: yup.string().required(),
	}),
});

export const registerValidator = yup.object({
	body: yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(8).required(),
		username: yup.string().required(),
		device: yup.string().required(),
	}),
});

export const forgetPasswordValidator = yup.object({
	body: yup.object({
		email: yup.string().email().required(),
	}),
});

export const resetPasswordValidator = yup.object({
	body: yup.object({
		otp: yup.string().required(),
	}),
});

