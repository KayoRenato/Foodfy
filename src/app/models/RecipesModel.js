const BaseModel = require("./BaseModel")
const db = require("../../config/db")

BaseModel.init({ table: 'recipes' })

module.exports = {
  ...BaseModel,
  async chefName(id){
    const results = await db.query(
      `
      SELECT recipes.*, chefs.name as chef_name FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = ${id}
      `
    )

    return results.rows
  }
}