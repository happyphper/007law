import {request} from "../api";


const URI = "/services";

export function index() {
  return request(URI);
}