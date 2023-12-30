import {request, streamRequest, uploadRequest} from "../api";


const URI = "/conversations";

export function index() {
  return request(URI);
}

export function show(id) {
  return request(`${URI}/${id}`);
}

export function store(id, content, onReceivedCallback) {
  const url = `${URI}`
  
  return streamRequest(url, 'POST', {cid: id, q:content}, {}, onReceivedCallback)
}

export function destroy(id) {
  return request(`${URI}/${id}}`, "DELETE");
}

export function upload(filePath, name) {
  return uploadRequest(`/doc/content`, filePath, name);
}