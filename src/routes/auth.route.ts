import { Router } from 'express';
import { authController } from '../controllers';
import { authGaurd, validatorGuard } from '../guards';
import {
	forgetPasswordValidator,
	loginValidator,
	registerValidator,
	resetPasswordValidator,
} from '../validators';

const router = Router();

router.post('/login', validatorGuard(loginValidator), authController.login);
router.post(
	'/register',
	validatorGuard(registerValidator),
	authController.register
);
router.post(
	'/password/forget',
	validatorGuard(forgetPasswordValidator),
	authController.forgetPassword
);
router.post(
	'/password/reset',
	validatorGuard(resetPasswordValidator),
	authController.resetPassword
);

router.post('/logout/all', authGaurd, authController.logoutAll);
router.post('/logout', authGaurd, authController.logout);
router.get('/me', authGaurd, authController.profile);

export const authRoute = {
	path: '/auth',
	router,
};
