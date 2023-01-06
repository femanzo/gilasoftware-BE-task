import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript'

import { Category, CategoryUsers, Channel, ChannelUsers } from './'

@Table
export class User extends Model {
  @Column declare name: string
  @Column declare email: string
  @Column declare phoneNumber: string

  @BelongsToMany(() => Category, () => CategoryUsers)
  declare subscribed: Array<Category & { CategoryUsers: CategoryUsers }>

  @BelongsToMany(() => Channel, () => ChannelUsers)
  declare channels: Array<Channel & { ChannelUsers: ChannelUsers }>
}
