const BaseModel = require("./BaseModel")

BaseModel.init({ table: 'recipes' })

module.exports = {
  ...BaseModel
}