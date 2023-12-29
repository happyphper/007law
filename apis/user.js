import {request, uploadRequest} from "../api";


const URI = "/user";

export function update(data) {
  return request(`${URI}/update`, 'POST', data);
}


export function upload(filePath, name) {
  return uploadRequest(`${URI}/avatar`, filePath, name);
}