  
const Base = require("./BaseModel")

Base.init({ table: 'files' })

module.exports = {
  ...Base
}