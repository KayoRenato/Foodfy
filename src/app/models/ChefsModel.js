const db = require('../../config/db')
const BaseModel = require("./BaseModel")

BaseModel.init({ table: 'chefs' })

module.exports = {
  ...BaseModel,
  async totalRecipes(id){
    const results = await db.query(
      `
      SELECT chefs.id, chefs.name, chefs.avatar_url, count(recipes) as total_recipes FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = '${id}'
      GROUP BY chefs.id
      `
    )

    return results.rows[0]
  },
  async listChefs(){
    const results = await db.query(
    `
    SELECT chefs.id, chefs.name, chefs.avatar_url, count(recipes) as total_recipes FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    GROUP BY chefs.id
    ORDER BY total_recipes DESC
    `)

    return results.rows

  }
}