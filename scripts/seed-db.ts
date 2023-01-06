import { sequelize } from '../src/core/db'

const {
  Category,
  CategoryNotifications,
  CategoryUsers,
  Channel,
  ChannelUsers,
  Log,
  Notification,
  User,
} = sequelize.models

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
export async function seed() {
  // create tables
  await Category.sync({ force: true })
  await CategoryNotifications.sync({ force: true })
  await CategoryUsers.sync({ force: true })
  await Channel.sync({ force: true })
  await ChannelUsers.sync({ force: true })
  await Log.sync({ force: true })
  await Notification.sync({ force: true })
  await User.sync({ force: true })

  // insert data
  await Promise.all([
    User.create({
      id: 1,
      name: 'Hannah Montana',
      email: 'hannah@montana.com',
      phoneNumber: '570-772-0716',
    }),
    User.create({
      id: 2,
      name: 'Axl Rose',
      email: 'axl@gnr.com',
      phoneNumber: '540-770-0234',
    }),
    User.create({
      id: 3,
      name: 'Jimmy McGill',
      email: 'saul@goodman.com',
      phoneNumber: '505-842-5662',
    }),

    Category.create({ id: 1, name: 'Sports' }),
    Category.create({ id: 2, name: 'Finance' }),
    Category.create({ id: 3, name: 'Movies' }),

    Channel.create({ id: 1, name: 'sms', title: 'SMS' }),
    Channel.create({ id: 2, name: 'email', title: 'E-mail' }),
    Channel.create({ id: 3, name: 'push', title: 'Push Notification' }),

    // User 1 is subscribed to Category Sports, Movies and Finance
    CategoryUsers.create({ id: 1, userId: 1, categoryId: 1 }),
    CategoryUsers.create({ id: 2, userId: 1, categoryId: 2 }),
    CategoryUsers.create({ id: 3, userId: 1, categoryId: 3 }),

    // User 2 is subscribed to Category Sports and Finance
    CategoryUsers.create({ id: 4, userId: 2, categoryId: 1 }),
    CategoryUsers.create({ id: 5, userId: 2, categoryId: 2 }),

    // User 3 is subscribed to Category Sports
    CategoryUsers.create({ id: 6, userId: 3, categoryId: 1 }),

    // User 1 will receive SMS, Email and Push Notifications
    ChannelUsers.create({ id: 1, userId: 1, channelId: 1 }),
    ChannelUsers.create({ id: 2, userId: 1, channelId: 2 }),
    ChannelUsers.create({ id: 3, userId: 1, channelId: 3 }),

    // User 2 will receive SMS, Email notifications
    ChannelUsers.create({ id: 4, userId: 2, channelId: 1 }),
    ChannelUsers.create({ id: 5, userId: 2, channelId: 2 }),

    // User 3 will receive only SMS notifications
    ChannelUsers.create({ id: 6, userId: 3, channelId: 1 }),
  ])
}

module.exports = { seed }
