const db = require('../../config/db')
const BaseModel = require("./BaseModel")

BaseModel.init({ table: 'users' })

module.exports = {
  ...BaseModel,
  async listUsers(){
    const results = await db.query(
    `
    SELECT users.id, users.name, users.email, count(recipes) as total_recipes FROM users
    LEFT JOIN recipes ON (recipes.user_id = users.id)
    GROUP BY users.id
    ORDER BY total_recipes DESC
    `)

    return results.rows

  }
}