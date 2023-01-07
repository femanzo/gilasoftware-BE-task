import { Router } from 'express'

import { adminController } from '../controllers'

const router = Router()

router.post('/notification/send', adminController.sendNotificationRequest)
router.get('/notification/logs', adminController.getNotificationsLogsRequest)
router.get('/users', adminController.getUsersRequest)

export default router
