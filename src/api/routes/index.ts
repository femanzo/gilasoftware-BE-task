import { Router } from 'express'
import adminRouter from './admin-router'
import userRouter from './user-router'

const router = Router().use('/admin', adminRouter).use('/user', userRouter)

export default router
