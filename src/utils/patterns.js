import { isEmpty } from 'lodash';

// 维护一份公用的正则表达式
const emailReg = /^[\w\+\-\_]+(\.[\w\+\-\_]+)*@[a-z\d\-\_]+(\.[a-z\d\-\_]+)*\.([a-z\d\-\_]{2,4})$/i;
const mobileReg = /^\d{9}$/i;

function validateEmail(value) {
  if (isEmpty(value)) {
    return false;
  }
  return emailReg.test(value);
}

function validateMobile(value) {
  if (isEmpty(value)) {
    return false;
  }
  return mobileReg.test(value);
}

export {
  validateEmail,
  validateMobile
}