const ChefsModel = require('../../models/ChefsModel')
const LoadService = require('../../services/LoadService')

const register = 'user'

function filledFiled(objFields, body){
  let error = null
  const keys = Object.keys(objFields)

  for(key of keys){
    if(body[key] == "")
      return error = "Prencha todos os campos."
  }
  
  return error
}

async function haveChef(name, id){
  let error = null

  const haveChef = await ChefsModel.findOne({WHERE: {name}})

  if(!!haveChef && haveChef.id != id){
    return error = "Chef já cadastrado."
  }

  return error
}

async function post(req, res, next) {

  let chef = { name, avatar_url } = req.body

  if(error = filledFiled({ name, avatar_url }, req.body))
    return res.render('admin/chef-create.njk', {register, chef, error})
  

  if(error = await haveChef(name, null)){
    chef = {
      avatar_url
    }

    return res.render('admin/chef-create.njk', {register, chef, error})
  }

  next()
}

async function put(req, res, next) {

  let chef = {id, name, avatar_url} = req.body

  if(error = filledFiled({name, avatar_url}, req.body))
    return res.render('admin/chef-edit.njk', {register, chef, error})
  
  if(error = await haveChef(name, id)){
    chef = await ChefsModel.totalRecipes({WHERE:{name}})
    chef = chef[0]
    const recipes_chef = await LoadService.load('recipes', {WHERE:{chef_id: chef.id}})

    return res.render('admin/chef-show.njk',{register, chef, recipes_chef, error})
  }

  next()
}

module.exports = {
  post,
  put
}