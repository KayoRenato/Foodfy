const express = require('express')
const nunjucks = require('nunjucks')
const dbFoodfy = require('./data/dataCardapio')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', (req, res)=> {

  return res.render('index', {items: dbFoodfy.slice(0,6)})
})

server.get('/receitas', (req, res)=> {
  return res.render('receitas', {items: dbFoodfy})
})

server.get('/receitas/:index', (req, res)=> {
  const { index: receitaIndex } = req.params
  const receita = dbFoodfy[receitaIndex]

  if(!receita) return res.status(404).render("notFound")

  return res.render('receita', {item: receita})
})

server.get('/sobre', (req, res)=> {
  return res.render('sobre')
})

server.use((req,res)=>{
  res.status(404).render("notFound")
})

server.listen(5000, () => console.log('server is running'))

