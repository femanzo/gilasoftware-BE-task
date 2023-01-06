import { Table, ForeignKey, Column, Model } from 'sequelize-typescript'

import { Notification, Category } from '.'

@Table
export class CategoryNotifications extends Model {
  @ForeignKey(() => Notification)
  @Column
  declare notificationId: number

  @ForeignKey(() => Category)
  @Column
  declare categoryId: number
}
