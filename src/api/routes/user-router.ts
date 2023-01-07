import { Router } from 'express'

import { userController } from '../controllers'

const router = Router()

router.patch('/', userController.updateUserSettingsRequest)

export default router
