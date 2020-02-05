
const links = document.querySelectorAll('h3 a')

for(let link of links){
  link.addEventListener('click', ()=>{
    const elemShowHide = checkTopic(link)
    elemShowHide.classList.toggle('hide')
  })
  
}

function checkTopic(link){
  const topic = link.classList.value
  return (document.querySelector(`.${topic} ul`) || document.querySelector(`.${topic} p`))
}