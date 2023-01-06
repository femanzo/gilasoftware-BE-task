import { BaseChannel } from './BaseChannel'
import type { User, Notification } from '../models'

export class SMSChannel extends BaseChannel {
  constructor(name: string) {
    super(name)
  }

  async _send(recipient: User, notification: Notification) {
    this.log(`
    We are sending an SMS to ${recipient.phoneNumber}:
    ${notification.message}
    `)

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate a delay, and a wrong phone number
        // the notification will be marked as error
        this.log('Something went wrong')
        reject('Phone number does not exist')
      }, 5000)
    })
  }
}
