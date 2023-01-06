import { Table, BelongsToMany, Column, Model, HasMany } from 'sequelize-typescript'

import { Category, CategoryNotifications, Log } from '.'

@Table({
  createdAt: true,
})
export class Notification extends Model {
  @Column declare message: string

  @HasMany(() => Log)
  declare logs: Awaited<Log[]>

  @BelongsToMany(() => Category, () => CategoryNotifications)
  declare categories: Array<Category & { CategoryNotification: CategoryNotifications }>
}
