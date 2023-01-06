import type { Request, Response, NextFunction } from 'express'

import { notificationServices, userServices } from '../../core/services'

const { updateCategorySubscription } = userServices

export const updateCategorySubscriptionRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, categories } = req.body

  if (!userId) return res.status(400).json({ message: 'userId field is required' })
  if (!categories || !categories.length)
    return res.status(400).json({ message: 'categories field is required' })

  try {
    const users = await updateCategorySubscription(userId, categories)

    return res.json(users)
  } catch (err) {
    return next(err)
  }
}
