const fs = require('fs')

const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB
const dbFoodfy2 = require('../../../data/data.json') //vai sair depois da persistência dos dados no DB

const register = 'user'

module.exports = {

  index(req, res) {
    try {
      return res.render('admin/index.njk', {register,  items: dbFoodfy })    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})

    }
  },

  show(req, res){
    try {
      const { id } = req.params
      const recipe = dbFoodfy[id]

      if(!recipe) return res.status(404).render('notFound.njk', {register})

      return res.render('admin/recipe-show.njk', { register, item: recipe, id })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  create(req, res){
    try {
      return res.render('admin/recipe-create.njk', { register })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  edit(req, res){
    try {
      const { id } = req.params
      const recipe = dbFoodfy2.recipes[id]

      if(!recipe) return res.status(404).render('notFound.njk')

      return res.render('admin/recipe-edit.njk', { register, recipe, id })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  post(req, res){
    try {
      let { title, author, image, ingredients, preparation, information } = req.body

      const recipe ={
        title,
        author,
        image,
        ingredients,
        preparation,
        information: information.trim()
      }

      dbFoodfy2.recipes.push(recipe)

      fs.writeFile("data/data.json", JSON.stringify(dbFoodfy2, null, 2), (err) => {
        if(err) return res.send("Write file error")

      })

      return res.redirect('/admin/recipes')
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  put(req, res){
    try {
      let { id ,title, author, image, ingredients, preparation, information } = req.body

      let recipe = dbFoodfy2.recipes[id]

      recipe ={
        ...recipe,
        title,
        author,
        image,
        ingredients,
        preparation,
        information:  information.trim()

      }

      dbFoodfy2.recipes[id] = recipe

      fs.writeFile("data/data.json", JSON.stringify(dbFoodfy2, null, 2), (err) => {
        if(err) return res.send("Write error")

      })

      return res.redirect(`/admin/recipes/${id}/edit`)
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  delete(req, res){
    try {
      const { id } = req.body
      console.log(id)

      const recipesFiltered = dbFoodfy2.recipes.filter((item) => {
        return dbFoodfy2.recipes[id] != item;
      })

      console.log(recipesFiltered)

      return res.send('ok')
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  }

}