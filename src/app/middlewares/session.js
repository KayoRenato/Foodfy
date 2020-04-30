const LoadService = require('../services/LoadService')

function DouUser(req, res, next){
  if(!req.session.userID)
    return res.redirect('/users/login')
  
  next()
}

function DouLogged(req, res, next){
  if(req.session.userID)
   return res.redirect('/')

   next()
}

async function DouOwner(req, res, next){
  try {
    const product = await Product.findOne({ WHERE: { user_id: req.session.userID }, AND: { id: req.params.id }})
    if(!product) 
      return res.redirect('/users/ads')
  
    next()

  } catch (err) {
    console.log(err)
    console.log(product)

    return res.redirect('/users/ads')
    
  }

}

async function DouStakeholder(req, res, next){
  const order = await Order.findOneOrder(req.params.id, req.session.userID)
  if(!order) 
    return res.redirect('/users') //colocar pagina não encontrada 404

  next()

}



module.exports = {
  DouUser,
  DouLogged,
  DouOwner,
  DouStakeholder
  
}