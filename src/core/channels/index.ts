import { EmailChannel } from './EmailChannel'
import { SMSChannel } from './SMSChannel'
import { PushNotificationChannel } from './PushNotificationChannel'
import type { BaseChannel } from './BaseChannel'

export const channels: Record<string, BaseChannel> = {
  email: new EmailChannel('email'),
  sms: new SMSChannel('sms'),
  push: new PushNotificationChannel('push'),
}
