import { assert } from '@japa/preset-adonis'
import { test } from '@japa/runner'

test.group('List items', () => {
  test('get a paginated list of items', async ({ client }) => {
    const response = await client.get('/items')

    
    response.assertBodyContains({
      meta: {
        per_page:10,
        current_page:1,
        total:100
      }
    })
    
  })
})
