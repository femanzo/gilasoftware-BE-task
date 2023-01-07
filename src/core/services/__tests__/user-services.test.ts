import { describe, expect, it } from '@jest/globals'

import { User, Category, Channel } from '../../models'

import { userServices } from '../'

const { updateUserSettings } = userServices

describe('updateUserSettings', () => {
  it("should update a user's subscribed categories and channels", async () => {
    // Create some test data
    const moviesCategory = await Category.findOne({
      where: { name: 'Movies' },
      rejectOnEmpty: true,
    })
    const channel = await Channel.findOne({ where: { name: 'sms' }, rejectOnEmpty: true })
    const user = await User.create({ name: 'User' })

    expect(moviesCategory.name).toEqual('Movies')
    expect(channel.name).toEqual('sms')

    await user.$set('subscribed', [moviesCategory])
    await user.$set('channels', [channel])

    // Call the function and assert on the result
    await updateUserSettings(user.id, [moviesCategory.name], [channel.name])

    const userChannels = await user.$get('channels')

    expect(userChannels.map((c) => c.name)).toEqual([channel.name])

    const userCategories = await user.$get('subscribed')

    expect(userCategories.map((c) => c.name)).toEqual([moviesCategory.name])
  })

  it('should throw an error if the user, category or channel does not exist', async () => {
    // Call the function and assert on the result
    await expect(updateUserSettings(123, ['Category 2'], ['Channel 2'])).rejects.toThrow(
      'User, category or channel not found'
    )
  })
})
