const LoadService = require('../services/LoadService')

const register = 'public' //será substituido per session posteriormente

module.exports = {
  async index(req, res) {
    try {
      const { term } = req.query

      if(!term)
        return res.redirect("/")

      const recipes = await LoadService.load('search', term)

      return res.render('search.njk', {register, recipes, term})
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  }
}