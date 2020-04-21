const BaseModel = require("./BaseModel")
const db = require("../../config/db")

BaseModel.init({ table: 'recipes' })

module.exports = {
  ...BaseModel,
  async recipesSignedBy(idChef){
    try {
      let query =
        `
        SELECT recipes.*, chefs.name as chef_name FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        `
        
      if(idChef){
        query +=
        `
        WHERE chefs.id = '${idChef}'    
        `
      }

      const results = await db.query(query)
  
      return results.rows
    } catch (err) {
      console.error(err);
    }
  },
  async recipeSigned(id){
    try {
      const results = await db.query(
        `
        SELECT recipes.*, chefs.name as chef_name FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = '${id}'
        `
      )
  
      return results.rows[0]
    } catch (err) {
      console.error(err);
    }
  },
  async search(filter){
    try {
      const query = `
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
      WHERE
        (recipes.title ilike '%${filter}%') 
    `
    const results = await db.query(query)

    return results.rows
    } catch (err) {
      console.error(err);
    }
  }
}