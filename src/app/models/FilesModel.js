  
const BaseModel = require("./BaseModel")

BaseModel.init({ table: 'files' })

module.exports = {
  ...BaseModel
}