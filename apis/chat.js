import {request, streamRequest} from "../api";


const URI = "/conversations";

export function index() {
  return request(URI);
}

export function show(id) {
  return request(`${URI}/${id}`);
}

export function store(id, content, onReceivedCallback) {
  content = encodeURIComponent(content.replace(/\+/g, "{[$add$]}"));

  const url = `${URI}?cid=${id}&q=${content}`
  
  return streamRequest(url, 'POST', {}, {}, onReceivedCallback)
}

export function destroy(id) {
  return request(`${URI}/${id}}`, "DELETE");
}