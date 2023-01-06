import { BelongsTo, ForeignKey, Table, Column, Model } from 'sequelize-typescript'

import { Notification, User, Channel } from '.'

@Table({
  timestamps: true,
})
export class Log extends Model {
  @Column declare status: string
  @Column declare error: string
  @Column declare channelName: string

  @ForeignKey(() => Notification)
  @Column
  declare notificationId: number

  @BelongsTo(() => Notification)
  declare notification: Notification

  @ForeignKey(() => User)
  @Column
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}
