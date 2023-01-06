import { BaseChannel } from './BaseChannel'
import type { User, Notification } from '../models'

export class PushNotificationChannel extends BaseChannel {
  constructor(name: string) {
    super(name)
  }

  async _send(recipient: User, notification: Notification) {
    this
      .log(`We are connecting to an external API and sending a push notification to ${recipient.name}:
    ${notification.message}
    `)
  }
}
