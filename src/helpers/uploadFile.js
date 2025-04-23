const url = `https://api.cloudinary.com/v1_1/dohbowmz0/auto/upload`;



const uploadFile = async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","craftbd")

    const response = await fetch(url,{
        method : 'post',
        body : formData
    })
    const responseData = await response.json()


    return responseData
}

export default uploadFile
