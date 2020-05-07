const UsersModel = require('../../models/UsersModel')
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

async function isMail(email, id){
  let error = null
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 

  if(!email.match(mailFormat)){
    return error = "E-mail Inválido!"
  }

  const haveUser = await UsersModel.findOne({WHERE: {email}})

  if(!!haveUser && haveUser.id != id){
    return error = "E-mail já cadastrado."
  }

  return error
}

async function post(req, res, next) {
  let user = { name, email, is_admin } = req.body, error = null

  if(error = filledFiled({name, email}, req.body)){
    return res.render('admin/user-create.njk', { register, user, error })
  }

  if(error = await isMail(email, null)){
     user = {
      name,
      is_admin
    }

    return res.render('admin/user-create.njk', { register, user, error })
  }

  next()
}

async function put(req, res, next) {
  let user = { id, name, email, is_admin } = req.body, error = null

  if(error = filledFiled({name, email}, req.body))
    return res.render('admin/user-edit.njk', { register, user, error})

  if(error = await isMail(email, id)){
    const {email} = await UsersModel.findOne({WHERE:{ id }}) 
    user ={
      id,
      name,
      email,
      is_admin
    }

    return res.render('admin/user-edit.njk', { register, user, error})
  }

  next()
}

module.exports = {
  post,
  put
}