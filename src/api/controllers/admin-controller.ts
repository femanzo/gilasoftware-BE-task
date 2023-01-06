import type { Request, Response, NextFunction } from 'express'

import { notificationServices, userServices } from '../../core/services'

const { sendNotification, getNotificationsLogs } = notificationServices
const { getUsers } = userServices

export const sendNotificationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, categories } = req.body

  if (!message) return res.status(400).json({ message: 'message field is required' })
  if (!categories || !categories.length)
    return res.status(400).json({ message: 'categories field is required' })

  try {
    await sendNotification({
      message,
      categories,
    })

    return res.status(201).end()
  } catch (err) {
    return next(err)
  }
}

export const getUsersRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers()

    return res.json(users)
  } catch (err) {
    return next(err)
  }
}

export const updateUserCategoriesSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, categories } = req.body

  if (!categories || !categories.length)
    return res.status(400).json({ message: 'categories field is required' })

  try {
    const users = await getUsers()

    return res.json(users)
  } catch (err) {
    return next(err)
  }
}

export const getNotificationsLogsRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getNotificationsLogs()

    return res.json(users)
  } catch (err) {
    return next(err)
  }
}
