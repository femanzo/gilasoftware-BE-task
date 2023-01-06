import { Sequelize } from 'sequelize-typescript'

import {
  Category,
  CategoryNotifications,
  CategoryUsers,
  Channel,
  ChannelUsers,
  Log,
  Notification,
  User,
} from './models'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  logging: false,
  models: [
    Category,
    CategoryNotifications,
    CategoryUsers,
    Channel,
    ChannelUsers,
    Log,
    Notification,
    User,
  ],
})
