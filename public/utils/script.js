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
  uploadLimit: 5,
  files: [],
  handleFileInput(event){
    const { files: fileList } = event.target
    PhotosUpload.input = event.target

    if(PhotosUpload.hasLimit(event)) return

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

  hasLimit(event){
    const { uploadLimit, input, preview } = PhotosUpload
    const { files: fileList } = input

    if(fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos!`)
      event.preventDefault()
      return true
    }

    const photosContainer = []
    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == "photo") 
        photosContainer.push(item)
    })

    const totalPhotos = fileList.length + photosContainer.length
    
    if(totalPhotos > uploadLimit) {
      alert(`Você atingiu o limite máximo de ${uploadLimit} fotos!`)
      event.preventDefault()
      return true
    }

    return false;
  },

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

