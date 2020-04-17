const RecipeModel = require('../models/RecipesModel')
const ChefModel = require('../models/ChefsModel')
const FilesModel = require('../models/FilesModel')
const RecipeFileModel = require('../models/RecipeFileModel')

async function getImages(ID){
  let filesID = await RecipeFileModel.findAll({WHERE: {recipe_id: ID}})

  let files = filesID.map( async file => (
      await FilesModel.find(file)))

  files = files.map( file => {

  })
}