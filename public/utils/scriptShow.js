
const links = document.querySelectorAll('h3 a')

for(let link of links){
  link.addEventListener('click', ()=>{
    checkText(link)
    checkTopic(link).classList.toggle('hide')
  })
  
}

function checkTopic(link){
  const topic = link.classList.value
  return (document.querySelector(`.${topic} ul`) || document.querySelector(`.${topic} p`))
}

function checkText(link){
  if(link.innerText == 'Mostrar'){
    return link.innerText = 'Esconder'
  } else {
    return link.innerText = 'Mostrar'
  }
}