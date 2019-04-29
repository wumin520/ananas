// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('chaoduoke-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('chaoduoke-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  if (!authority && APP_TYPE === 'site') {
    return ['admin'];
  }
  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('chaoduoke-authority', JSON.stringify(proAuthority));
}
export function setShState(state) {
  return localStorage.setItem('sh_state', state);
}
export function getShState(state = 0) {
  return localStorage.getItem('sh_state', state || 0);
}
export function setUserToken(token) {
  return localStorage.setItem('token', token || '');
}
export function getUserToken() {
  return localStorage.getItem('token');
}
export function setStorage(key, val) {
  return localStorage.setItem(key, val);
}
export function getStorage(key) {
  return localStorage.getItem(key);
}
export function setInviteCode(inviteCode) {
  return localStorage.setItem('inviteCode', inviteCode || '');
}
export function getInviteCode() {
  return localStorage.getItem('inviteCode');
}
