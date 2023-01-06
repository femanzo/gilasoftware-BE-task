import { Table, ForeignKey, Column, Model } from 'sequelize-typescript'

import { User, Channel } from '.'

@Table
export class ChannelUsers extends Model {
  @ForeignKey(() => User)
  @Column
  declare userId: number

  @ForeignKey(() => Channel)
  @Column
  declare channelId: number
}
