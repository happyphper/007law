import {request} from "../api";


const URI = "/questions";

export function index() {
  return request(URI);
}
