  
const BaseModel = require("./BaseModel")

BaseModel.init({ table: 'recipe_files' })

module.exports = {
  ...BaseModel
}