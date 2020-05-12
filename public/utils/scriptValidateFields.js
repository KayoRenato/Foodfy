const Validate = {
  apply(input, func) {
    Validate.clearErrors(input)

    let results = Validate[func](input.value)
    input.value = results.value

    if(results.error){
      Validate.displayError(input, results.error)
    }
    
    // input.focus()
  },
  displayError(input, error){
    const wrapper = document.querySelector('.wrapper')
    const div = document.createElement('div')
    const tex = document.createElement('p')
    div.classList.add('error')
    tex.innerHTML = error
    
    if(input)
    input.classList.add('border_error')
    
    div.appendChild(tex)
    wrapper.appendChild(div)

    if(input)
      input.focus()
  },
  clearErrors(){
    const errorDiv = document.querySelector('.error')
    const errorBorder = document.querySelectorAll('.field_empty_error')

    if(errorDiv)
      errorDiv.remove()

    for(item of errorBorder){
      item.classList.remove("field_empty_error")
    }

  },
  isEmail(value){
    let error = null

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 

    if(value.length > 0 && !value.match(mailFormat))
      error = "E-mail Inválido!"
    
    return {
      error,
      value
    }
  },
  allFields(){
    const items = document.querySelectorAll('.card-content input[type=text], .card-content input[type=email], .card-content input[type=file], input[type=email], input[type=password]')
    const imgs = document.querySelectorAll('#photos-preview img')

    let error = null, inputs = true
    
    const gallery = imgs.length

    for(item of items){
      if(item.value == ""){
        if(item.name === "photos"){
          if(!gallery){
            document.querySelector('#photos-upload').classList.add('field_empty_error')
            inputs = false
          }
        } else {
          item.classList.add('field_empty_error')
          inputs = false
        }
      }
    }

    if(!inputs){
      error = `Por favor, prencha todos os campos!`

      Validate.displayError(null, error)

      setTimeout(() => {Validate.clearErrors()}, 2000)
    }

  },
  allFieldsSession(event){
    const items = document.querySelectorAll('input[type=email], input[type=password]')
    let error = null, inputs = true
    
    for(item of items){
      if(item.value == ""){
          item.classList.add('field_empty_error')
          inputs = false
      }
    }

    if(!inputs){
      error = `Por favor, prencha todos os campos!`

      Validate.displayError(null, error)

      event.preventDefault()
    }

  }
}