const RecipeModel = require('../models/RecipesModel')
const ChefModel = require('../models/ChefsModel')
const FilesModel = require('../models/FilesModel')
const RecipeFileModel = require('../models/RecipeFileModel')

async function getImages(ID){
  let filesID = await RecipeFileModel.findAll({WHERE: {recipe_id: ID}})

  if(filesID){
    let filesPromise = filesID.map( async file => (
      await FilesModel.find(file.file_id)))

    let files = await Promise.all(filesPromise)

    files = files.map( file => ({
      id: file.id,
      name: file.name,
      path: file.path,
      src: `${file.path.replace("public","")}`
    }))

    return files
  }
  
}

async function getChef(ID){
  let chef = await ChefModel.find(ID)

  return chef
}

async function format(recipe){
  const files = await getImages(recipe.id)
  const chef = await getChef(recipe.chef_id)

  recipe.img = files[0].src
  recipe.files = files
  recipe.chef_name = chef.name

  console.log(recipe)
  return recipe
}

const LoadRecipe = {
  load(service, filter){
    this.filter = filter
    return this[service]()
  },
  async recipe(){
    try {
      const recipe = await RecipeModel.findOne(this.filter)
      return format(recipe)
    } catch (err) {
      console.error(err);
      
    }
  },
  async recipes(){
    try {
      let recipes = await RecipeModel.findAll(this.filter)
      console.log(recipes)
      const recipesPromise = recipes.map(format)
      
      return Promise.all(recipesPromise)
    } catch (err) {
      console.error(err);
      
    }
  },
  format,

}

module.exports = LoadRecipe