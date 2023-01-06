import { Table, BelongsToMany, Column, Model } from 'sequelize-typescript'

import { User, ChannelUsers } from '.'

@Table
export class Channel extends Model {
  @Column declare name: string

  @BelongsToMany(() => User, () => ChannelUsers)
  declare users: Array<User & { ChannelUsers: ChannelUsers }>
}
