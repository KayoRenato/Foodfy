const UsersModel = require('../../models/UsersModel')
const register = 'user'

async function post(req, res, next) {
  let { name, email, is_admin } = req.body

  const keys = Object.keys({ name, email })

  for(key of keys){
    if(req.body[key] == "")

      return res.render('admin/user-create.njk', { register })
  }

  const haveUser = await UsersModel.findOne({WHERE: {email}})

  if(haveUser){
    user = {
      name,
      is_admin
    }

    return res.render('admin/user-create.njk', {register ,user })
    //enviar mensagem de erro para o frontend
  }

  next()
}

async function put(req, res, next) {
  let { id, name, email, is_admin } = req.body

  const keys = Object.keys({ name, email })

  for(key of keys){
    if(req.body[key] == "")

      return res.redirect(`/admin/users/${id}/edit`)
  }

  const haveUser = await UsersModel.findOne({WHERE: {email}})

  if(haveUser){
    user = {
      id,
      name,
      is_admin
    }

    return res.render('admin/user-edit.njk', {register , user })
    //enviar mensagem de erro para o frontend
  }

  next()
}

module.exports = {
  post,
  put
}