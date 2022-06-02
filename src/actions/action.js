import { API } from "aws-amplify";



export const uploadImage = async (imageData) =>  {
  const data = await API.post("myimageapi","/image",{body:imageData})
  console.log(data)
  
    return data;
};

export const getImg = async (imgKey) =>  {
  const res = await API.get("myimageapi",`/${imgKey}`,{
    'responseType': 'blob',
  })

  return res;
};