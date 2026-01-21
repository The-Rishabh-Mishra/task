const TOKEN_KEY="auth_token"

export const setToken =()=>{
    localStorage.setItem(TOKEN_KEY)
};


export const getToken = (token)=>{
   return localStorage.getItem(TOKEN_KEY,token);
};


export const removeToken = ()=>{
    localStorage.removeItem(TOKEN_KEY)
};


export const isAuthenticated = ()=>{
    return !!getToken();
};