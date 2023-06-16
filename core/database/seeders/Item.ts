import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Item from 'App/Models/Item'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    
    await Item.createMany(
      (()=> { 
        const ret:Object[] = [];
        for(let i = 0; i < 100; ++i){
          ret.push({text:`seeded item number ${i}`})
        }
        return ret;
      })()
    )
  }
}
