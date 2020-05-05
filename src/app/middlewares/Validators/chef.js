const ChefsModel = require('../../models/ChefsModel')
const register = 'user'

async function post(req, res, next) {

  const { name, avatar_url } = req.body

  const keys = Object.keys({ name, avatar_url })

  for(key of keys){
    if(req.body[key] == "")
      return res.render('admin/chef-create.njk', { register })
  }
  
  // Validar formato png, jpeg e jpg no backend e frontend. caminho deve começar com  "https://" e terminar com umas das 3 extensões
  const haveChef = await ChefsModel.findOne({WHERE: {name}})

  if(haveChef){
    chef = {
      avatar_url
    }

    return res.render('admin/chef-create.njk', { chef })
    //enviar mensagem de erro para o frontend
  }

  next()
}

async function put(req, res, next) {

  const {id, name, avatar_url} = req.body

  const keys = Object.keys({ name, avatar_url })

  for(key of keys){
    if(req.body[key] == "")
    return res.redirect(`/admin/chefs/${id}/edit`)
  }

  // Validar formato png, jpeg e jpg no backend e frontend. caminho deve começar com  "https://" e terminar com umas das 3 extensões
  const haveChef = await ChefsModel.findOne({WHERE: {name}})

  if(haveChef){
    chef = {
      avatar_url
    }

    return res.render('admin/chef-create.njk', { chef })
    //enviar mensagem de erro para o frontend
  }

  next()
}

module.exports = {
  post,
  put
}