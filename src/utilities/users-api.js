import { getToken } from "./users-service";

const BASE_URL = '/api/users';

// import { application } from "express";
// import { json } from "react-router-dom";

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
   return sendRequest(`${BASE_URL}/login`, 'POST', credentials);    
}
export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken()
  if (token) {
      options.headers = options.headers || {}
      options.headers.Authorization =`Bearer ${token}`
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}


// const res = await fetch(BASE_URL, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(userData)
// });
// if (res.ok) {
//   return res.json();
// } else {
//   throw new Error('Invalid Sign Up');
// }

// const res = await fetch(`${BASE_URL}/login`, {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify(credentials)
// }) 

// if (res.ok) {
//   return res.json()
// } else {
//   throw new Error('Invalid Login')
// }  