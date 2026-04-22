import axios from "axios"


export  const UploadImage=async imageData =>{
    const formData=  new FormData()
    formData.append('image',imageData)
    const data = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_host}`, formData)
      return data?.data?.data?.display_url
}

// save or update use in db

export const saveOrUpdateUser=async(userData)=>{
  const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/user`,userData)
  return data
}