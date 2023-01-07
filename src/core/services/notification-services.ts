import { Op } from 'sequelize'

import { BaseChannel } from '../channels/BaseChannel'
import { channels } from '../channels'
import { sequelize } from '../db'
import { User, Notification, Log } from '../models'

const { Category } = sequelize.models

type NotificationParams = {
  categories: string[]
  message: string
}

export const createNotification = async (notificationParams: NotificationParams) => {
  const categories = await Category.findAll({
    where: {
      name: {
        [Op.in]: notificationParams.categories,
      },
    },
  })

  if (!categories.length) throw new Error('Categories not found')

  const notification = await Notification.create({
    message: notificationParams.message,
  })

  await notification.$set(
    'categories',
    categories.map((c) => c.dataValues.id)
  )

  return notification
}

export const getNotifications = async () => {
  return await Notification.findAll()
}

export const getNotification = async (id: string) => {
  return await Notification.findByPk(id, {
    include: Category,
  })
}

export const addNotificationToPipeline = async (notification: Notification) => {
  const categories = await notification.$get('categories')

  // List of users that subscribed to the notification categories
  const subscribedUsers = await User.findAll({
    include: ['subscribed', 'channels'],
    where: {
      '$subscribed.id$': {
        [Op.in]: categories.map((c) => c.id),
      },
    },
  })

  subscribedUsers.forEach((user) => {
    user.channels.forEach((channel) => {
      sendThroughChannel(channel.name, user, notification)
    })
  })

  return
}

export const sendThroughChannel = async (
  channelName: string,
  user: User,
  notification: Notification
) => {
  const channel = getChannelByName(channelName)

  if (!channel) throw new Error('Channel not found')

  channel.send(user, notification)
}

export const getChannelByName = (channelName: string): BaseChannel => {
  const channel = channels[channelName]
  if (!channel) {
    throw new Error('Channel not found')
  }
  return channel
}

export const getNotificationsLogs = async () => {
  return await Notification.findAll({
    include: [
      {
        model: Log,
        include: ['user'],
      },
      {
        model: Category,
        attributes: ['name'],
      },
    ],

    order: [['createdAt', 'DESC']],
  })
}

export const sendNotification = async (notificationParams: NotificationParams) => {
  const notification = await createNotification(notificationParams)
  addNotificationToPipeline(notification)
}
