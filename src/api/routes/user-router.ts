import { Router } from 'express'

import { userController } from '../controllers'

const router = Router()

router.patch('/subscribe', userController.updateCategorySubscriptionRequest)

export default router
