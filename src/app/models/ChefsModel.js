const db = require('../../config/db')
const BaseModel = require("./BaseModel")

BaseModel.init({ table: 'chefs' })

module.exports = {
  ...BaseModel,
   async totalRecipes(filters){
    let query = 
    `
    SELECT chefs.id, chefs.name, chefs.avatar_url, count(recipes) as total_recipes 
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    `
  
    if(filters){ 
      Object.keys(filters).map(key => {
        // WHERE || OR || AND
        query += ` ${key}`
  
        Object.keys(filters[key]).map( field => {
          query += ` ${field} = '${filters[key][field]}'`
        })
      })
    } else {
      query += ` WHERE 1 = 1 `
    }
  
    query += ` 
    GROUP BY chefs.id 
    ORDER BY total_recipes DESC
    `
    const results = await db.query(query)

    return results.rows
  }
}