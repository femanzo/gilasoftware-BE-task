import { Table, BelongsToMany, Column, Model } from 'sequelize-typescript'

import { User, CategoryUsers, Notification, CategoryNotifications } from '.'

@Table
export class Category extends Model {
  @Column declare name: string

  @BelongsToMany(() => User, () => CategoryUsers)
  declare subscribers: Array<User & { CategoryUsers: CategoryUsers }>

  @BelongsToMany(() => Notification, () => CategoryNotifications)
  declare notifications: Array<
    Notification & { CategoryNotifications: CategoryNotifications }
  >
}
