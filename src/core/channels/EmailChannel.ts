import { BaseChannel } from './BaseChannel'
import type { User, Notification } from '../models'

export class EmailChannel extends BaseChannel {
  constructor(name: string) {
    super(name)
  }

  async _send(recipient: User, notification: Notification) {
    this.log(`
  We are connecting to SMTP server and sending an e-mail to ${recipient.email}:
  ${notification.message}
  `)

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate a delay, when we resolve the promise
        // the notification will be marked as sent
        this.log('Email sent')
        resolve()
      }, 1000)
    })
  }
}
