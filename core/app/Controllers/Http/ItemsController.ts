import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class ItemsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const sort = request.input('sort', 'id')
    const sortDirection = request.input('sortDirection', 'asc')
    
    const limit = 10

    // Cache middleware if theres time
    const posts = await Database.from('items')
    .orderBy(string.snakeCase(sort), sortDirection)
    .paginate(page, limit)

    // Changes the baseURL for the pagination links
    posts.baseUrl('/items')

    return posts.toJSON()
  }
}
