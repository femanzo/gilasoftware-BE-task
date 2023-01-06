import { Log, User, Notification } from '../models'
import debug from 'debug'

debug.enable('app:*')

export class BaseChannel {
  protected log: debug.Debugger

  constructor(public name: string) {
    this.log = debug(`app:core:channel:${name}`)
  }

  async _send(recipient: User, notification: Notification): Promise<void> {}

  async send(recipient: User, notification: Notification) {
    const log = await Log.create({
      userId: recipient.id,
      notificationId: notification.id,
      channelName: this.name,
      status: 'sending',
    })

    // Common log for all channels
    this.log(`Sending ${this.name} to ${recipient.name}: ${notification.message}`)

    // Here we call the _send method that is implemented in each channel
    // and we mark the notification as sent or failed
    this._send(recipient, notification)
      .then(async () => {
        log.status = 'sent'
      })
      .catch((errMessage) => {
        log.status = 'failed'
        log.error = errMessage
        this.log(errMessage)
      })
      .finally(async () => {
        await log.save()
      })
  }
}
