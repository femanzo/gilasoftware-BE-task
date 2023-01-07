import { describe, expect, test } from '@jest/globals'

import { notificationServices } from '../'
import { getChannelByName } from '../notification-services'

const { createNotification } = notificationServices

describe('Notification Service', () => {
  test('createNotification should be created with the right categories', async () => {
    const message = 'Hello world!'
    const notification = await createNotification({
      categories: ['Finance'],
      message,
    })

    expect(notification).toBeDefined()
    expect(notification).toHaveProperty('message', message)
  })

  test('create movies notification should create a log', async () => {
    await createNotification({
      categories: ['Movies'],
      message: 'Hello Movies subscribers',
    }).then(async (notification) => {
      await notificationServices.addNotificationToPipeline(notification)
      const logs = await notification.$get('logs')
      expect(logs.length).toBeGreaterThan(0)
      expect(logs[0]).toHaveProperty('status', 'sending')
    })
  })

  test('getChannelByName', async () => {
    const channel = getChannelByName('sms')
    expect(channel).toHaveProperty('name', 'sms')
    expect(channel).not.toHaveProperty('name', 'email')
  })
})
