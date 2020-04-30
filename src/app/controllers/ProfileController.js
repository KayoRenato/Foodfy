module.exports = {
  async index(req, res) {
    try {

    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk')
    }
  },
  async put(req, res) {
    try {

    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk')
    }
  }
}