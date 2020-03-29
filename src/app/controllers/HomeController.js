module.exports = {

  index(req, res){
    const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB

    try {
      return res.render('index.njk', {items: dbFoodfy.slice(0,6)})
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk')
    }
  },
  
  about(req,res) {
    try {
      return res.render('about.njk')
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk')
    }
  
  }
}
