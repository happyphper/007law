import {request} from "../api";


const URI = "/auth";

export function code(code) {
  return request(`${URI}/code?code=${code}`);
}

export function register(data) {
  return request(`${URI}/register`, 'POST', data);
}

export function login(openid, phone, name) {
  return request(`${URI}/login`, 'POST', { openid: openid, phone: phone, name: name});
}