import { Table, ForeignKey, Column, Model } from 'sequelize-typescript'

import { User, Category } from '.'

@Table
export class CategoryUsers extends Model {
  @ForeignKey(() => User)
  @Column
  declare userId: number

  @ForeignKey(() => Category)
  @Column
  declare categoryId: number
}
