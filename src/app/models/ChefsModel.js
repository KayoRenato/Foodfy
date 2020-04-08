const BaseModel = require("./BaseModel")

BaseModel.init({ table: 'chefs' })

module.exports = {
  ...BaseModel
}