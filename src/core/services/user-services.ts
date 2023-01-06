import { User, Category } from '../models'

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

export const updateCategorySubscription = async (
  userId: number,
  categoryNames: string[]
) => {
  const user = await User.findByPk(userId)
  const category = await Category.findAll({
    where: {
      name: categoryNames,
    },
  })

  if (!user || !category) {
    throw new Error('User or category not found')
  }

  await user.$set('subscribed', category)

  return await user.$get('subscribed')
}
