const currentPage = location.pathname
const menuItems = document.querySelectorAll(".header .menu a")

for(item of menuItems){
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add("active")
  }
}

const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photos-preview'),
  uploadLimitMax: 5,
  files: [],
  handleFileInput(event){
    const { files: fileList } = event.target
    PhotosUpload.input = event.target

    if(PhotosUpload.hasLimitMax(event)) return

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file)      
      
      const reader = new FileReader() 

      reader.onload = () => {
        const image = new Image() 
        
        image.src = String(reader.result)

        const div = PhotosUpload.createContainer(image)

        PhotosUpload.preview.appendChild(div)
      }

      reader.readAsDataURL(file)

    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },

  hasLimitMax(event){
    const { uploadLimitMax, input, preview } = PhotosUpload
    const { files: fileList } = input

    if(fileList.length > uploadLimitMax) {
      alert(`Envie no máximo ${uploadLimitMax} fotos!`)
      event.preventDefault()
      return true
    }

    const photosContainer = []
    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == "photo") 
        photosContainer.push(item)
    })

    const totalPhotos = fileList.length + photosContainer.length
    
    if(totalPhotos > uploadLimitMax) {
      alert(`Você atingiu o limite máximo de ${uploadLimitMax} fotos!`)
      event.preventDefault()
      return true
    }

    return false;
  },

  // hasLimitMin(event){
  //   const { preview } = PhotosUpload

  //   const photosContainer = []
  //   preview.childNodes.forEach(item => {
  //     if(item.classList && item.classList.value == "photo") 
  //       photosContainer.push(item)
  //   })

  //   console.log(photosContainer, photosContainer.length)

  //   if(!photosContainer){
  //     alert(`Você atingiu o limite máximo de ${uploadLimitMax} fotos!`)
  //     event.preventDefault()
  //     return true
  //   }

  //   return false;
  // },

  getAllFiles(){
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },

  createContainer(image){
    const container = document.createElement('div')

    container.classList.add('photo')
    container.onclick = PhotosUpload.removeImgBeforeDB

    container.appendChild(image)
    container.appendChild(PhotosUpload.createIconRemove())

    return container
    
  },

  createIconRemove(){
    const icon = document.createElement('i')
    icon.classList.add('fas', 'fa-times')
    return icon
  },

  removeImgBeforeDB(event){
    const photoDiv = event.target.parentNode 
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()
    photoDiv.remove();
  },

  removeImgAfterDB(event){
    const photoDiv = event.target.parentNode

    if(photoDiv.id){
      const removedFiles = document.querySelector('input[name="removed_files"]')
      if(removedFiles){
        removedFiles.value += `${photoDiv.id},`
      }
    }

    photoDiv.remove();
  }
}

