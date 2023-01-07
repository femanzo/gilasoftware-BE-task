import { User, Category, Channel } from '../models'

export const getUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        model: Category,
        as: 'subscribed',
        attributes: ['name'],
      },
      'channels',
    ],
  })

  return users
}

export const updateUserSettings = async (
  userId: number,
  categoryNames: string[],
  channelNames: string[]
) => {
  const user = await User.findByPk(userId)
  const categories = await Category.findAll({
    where: {
      name: categoryNames,
    },
  })

  const channels = await Channel.findAll({
    where: {
      name: channelNames,
    },
  })

  if (!user || !categories || !channels) {
    throw new Error('User, category or channel not found')
  }

  await user.$set('subscribed', categories)
  await user.$set('channels', channels)

  return await user.$get('subscribed')
}
