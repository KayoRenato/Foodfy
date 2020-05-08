const UsersModel = require('../models/UsersModel')
const ChefsModel = require('../models/ChefsModel')
const LoadService = require('../services/LoadService')

const Mailer = require('../lib/mailer')

const register = 'user'

module.exports = {
  async users(req, res) {
    try {
      let users = await UsersModel.listUsers()

      return res.render('admin/users.njk', {users, register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userCreate(req, res) {
    try {
      return res.render('admin/user-create.njk', { register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userPost(req, res) {
    try {
      let { name, email, is_admin } = req.body,
      password = 123 // Substituir pelo envio de hash por email para o usuário criar sua senha.

      is_admin === "on"? is_admin = true : is_admin = false

      const user = await UsersModel.saveCreate({name, email, password, is_admin})

      //ajustar link para acessar rota de criação de senha.
      await Mailer.sendMail({
        to: email,
        from: 'no-reply@foodyfy.com',
        subject: 'Usuário Criado - Validação de registro',
        html: `
        <div style="max-width: 500px;
            margin: 50px auto;">

        <h2 style="text-align:center;">Seu conta foi criada em nossos serviços!</h2>
        <p style="text-align:center;"> Para validar seu registro, basta você acessar o link e criar sua senha.</p>
        <p style="text-align:center;"> Assim, você poderá aproveitar todos os benefícios de nossa plataforma.</p>
        </br></br>
        <div style=
             "
              width: 100%;
              text-align: center;"> 
                <a style= 
                  "
                  text-decoration: none;
                  background: #6558C3;
                  border: 0px solid #271d72;
                  border-width: 0px 0px 4px 0px;
                  padding: 10px 20px;
                  color: #fff;
                  font-weight: 900;
                  font-style: normal
                "href="#" target="_blank">
                  CRIAR SENHA
                </a>
          </div>
        <p style="margin-top: 20px; font-size: 10; color: #777; text-align:center;"> Essa validação estará ativa por 5 minutos. </p>
        </br></br>
        <p style="text-align:center">Atensiosamente,</p>
        <p style="text-align:center;">
          <img src="https://www.imagemhost.com.br/images/2020/05/07/logoBlack.png" alt="logoBlack.png" border="0" width="130" height="40"/>
        </p>

        </div>
        `
      })
      
      return res.render('admin/user-edit.njk', {register, user ,done: "Usuário cadastrado com sucesso! Token enviado para o e-mail."})
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userShow(req, res) {
    try {

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userEdit(req, res) {
    try {
      const {id} = req.params

      let user = await UsersModel.findOne({WHERE: {id}})

      user = {
        id: user.id,
        name:user.name,
        email: user.email,
        is_admin: user.is_admin
      }

      return res.render('admin/user-edit.njk', {user, register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userPut(req, res) {
    try {
      let {id, name, email, is_admin} = req.body

      is_admin === "on"? is_admin = true : is_admin = false

      const user = await UsersModel.saveUpdate(id, {name, email, is_admin})

      return res.render('admin/user-edit.njk', {register, user, done: "Usuário atualizado com sucesso!"})

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userDelete(req, res) {
    try {
      const { id } = req.body

      await UsersModel.delete(id)

      return res.redirect('/admin/users')
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },


  async chefs(req, res){
    try {
      const chefs = await ChefsModel.findAll()
      return res.render('admin/chefs.njk', {register , chefs })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  chefCreate(req,res){
    try {
      return res.render('admin/chef-create.njk', { register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefPost(req,res){
    try {
      const { name, avatar_url } = req.body

      const chef = await ChefsModel.saveCreate({name, avatar_url})

      return res.render('admin/chef-show.njk', {register, chef, done:'Chef criado com sucesso!'})

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefShow(req,res){
    try {
      const { id } = req.params
      let chef = await ChefsModel.totalRecipes({WHERE:{ 'chefs.id': id }})
      chef = chef[0]
      
      const recipes_chef = await LoadService.load('recipes', {WHERE: { chef_id: id }})

      return res.render('admin/chef-show.njk', {chef, recipes_chef, register})
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefEdit(req,res){
    try {
      const { id } = req.params
      const chef = await ChefsModel.findOne({WHERE: {id}})

      return res.render('admin/chef-edit.njk', {chef, register})
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefPut(req,res){
    try {
      const {id, name, avatar_url} = req.body

      const chef = await ChefsModel.saveUpdate(id, {name, avatar_url})

      const recipes_chef = await LoadService.load('recipes', {WHERE:{chef_id: id}})

      return res.render('admin/chef-show.njk', {register, chef, recipes_chef, done:'Chef atualizado com sucesso!'})

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
    
  },
  async chefDelete(req,res){
    try {
      const { id } = req.body

      let recipes = await LoadService.load('recipes', {WHERE: { chef_id: id }})

      recipes.map( async recipe => {
        let filesPromise =  recipe.files.map( file => {
          unlinkSync(file.path)
          FilesModel.delete(file.id) }
        )

        await Promise.all(filesPromise)
       
      })

      await ChefsModel.delete(id)

      return res.redirect('/admin/chefs')

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  }
}