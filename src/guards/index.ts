import express from 'express';

import { loggerGuard } from './logger.guard';

export const guards = [
	loggerGuard,
	express.urlencoded({ extended: true }),
	express.json({ limit: '50mb' }),
	express.static('public', {
		maxAge: 31557600000,
		dotfiles: 'ignore',
	}),
];

export * from './validate.guard';
export * from './auth.guard';