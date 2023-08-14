import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie';
import Router from 'next/router';

export const handleResponse = response => {
  if (response.status === 401) {
    signout(() => {
      //removeCookie('token')
      //removeLocalStorage('user')
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session is expired. Please signin'
        }
      });
    });
  }
};

export const preSignup = user => {
  return fetch(`${API}/pre-signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err));
}

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err));
}

export const signout = next => {
  removeCookie('token')
  removeLocalStorage('user')
  next()

  return fetch(`${API}/signout`, {
    method: 'GET'
  })
    .then(response => {
      console.log('signout success')
    })
    .catch(err => console.log(err));
};

// npm i isomorphic-fetch

/*-----------------------------------------*/

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

// get cookie
export const getCookie = key => {
  if (process.browser) {
    return cookie.get(key);
    // pongkol salah satu masalah hydrasi ketika di return get cookie
    // alternatif setting _app.tsx untuk dynamic render html 
  }
};

// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// autheticate user bypass data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

// process.browser is deprecated, but still running, if next error can use bellow this
/*
if (typeof window !== "undefined") {
  // Write your client-side statements here.
  window.localStorage.getItem("key");
  window.localStorage.setItem("key", "value");
}
*/

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'));
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth));
      next();
    }
  }
};

export const forgotPassword = email => {
  return fetch(`${API}/forgot-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
  return fetch(`${API}/reset-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetInfo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const loginWithGoogle = (user) => {
  return fetch(`${API}/google-login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(credentialResponse => {
      return credentialResponse.json();
    })
    .catch(err => console.log(err));
};