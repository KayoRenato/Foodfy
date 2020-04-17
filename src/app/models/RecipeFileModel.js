  
const Base = require("./BaseModel")

Base.init({ table: 'recipe_files' })

module.exports = {
  ...Base
}