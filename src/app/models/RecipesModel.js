const BaseModel = require("./BaseModel")
const db = require("../../config/db")

BaseModel.init({ table: 'recipes' })

module.exports = {
  ...BaseModel,
  async recipesSignedBy(id){
    const results = await db.query(
      `
      SELECT recipes.*, chefs.name as chef_name FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = '${id}'
      `
    )

    return results.rows
  },
  async recipeSigned(id){
    const results = await db.query(
      `
      SELECT recipes.*, chefs.name as chef_name FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE recipes.id = '${id}'
      `
    )

    return results.rows[0]
  },
  async search(filter){

    let query = `
      SELECT recipes.id, recipes.title, recipes.image, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE
        (recipes.title ilike '%${filter}%') 
    `
    const results = await db.query(query)

    return results.rows
  
  }
}