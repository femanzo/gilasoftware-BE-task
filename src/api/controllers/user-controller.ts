import type { Request, Response, NextFunction } from 'express'

import { userServices } from '../../core/services'

const { updateUserSettings } = userServices

export const updateUserSettingsRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, categories, channels } = req.body

  if (!userId) return res.status(400).json({ message: 'userId field is required' })
  if (!categories)
    return res.status(400).json({ message: 'categories field is required' })
  if (!channels) return res.status(400).json({ message: 'channels field is required' })

  try {
    const users = await updateUserSettings(userId, categories, channels)

    return res.json(users)
  } catch (err) {
    return next(err)
  }
}
