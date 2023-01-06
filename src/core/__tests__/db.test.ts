import { describe, expect, test } from '@jest/globals'

import { sequelize } from '../db'

const { User, Category } = sequelize.models

describe('database basic testing', () => {
  test('User model should return all users', async () => {
    const users = await User.findAll()
    expect(users.length).toBe(3)
  })

  test('User 1 should be subscribed to all categories', async () => {
    const user = await User.findByPk(1, {
      include: ['subscribed'],
      rejectOnEmpty: true,
    })

    expect(user.dataValues.subscribed.length).toBe(3)
  })

  test('Category 1 should have 3 users subscribed', async () => {
    const category = await Category.findByPk(1, {
      include: ['subscribers'],
      rejectOnEmpty: true,
    })
    expect(category.dataValues.subscribers.length).toBe(3)
  })
})
