function MoreOne(content, item) {
  const ingredients = document.querySelector(content);
  const fieldContainer = document.querySelectorAll(item);

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;
  
  // verificar todos os campos, o usuário pode inicialmente colocar o valor de depois remover em inputs anteriores

  newField.children[0].value = "";
  ingredients.appendChild(newField);
}
