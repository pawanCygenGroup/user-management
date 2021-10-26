import axios from 'axios';

class BaseService{
  constructor(baseURL = 'https://reqres.in/api/'){
    this.api = new axios.create({
      baseURL: baseURL
    });
  }
  get = (url) =>{
    return this.api.get(url).then(response =>response).catch(error =>error)
  }
  post = (url,postData) =>{
    return this.api.post(url,postData)
  }
  put = (url,updatedData) =>{
    return this.api.put(url,updatedData)
  }
  patch = (url,updatedData) =>{
    return this.api.patch(url,updatedData)
  }
  delete = (url) =>{
    return this.api.delete(url)
  }
}

export default BaseService;