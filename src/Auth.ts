export function UserLogin(){
    const Login = localStorage.getItem("login")
    return JSON.parse(Login)
}
export function isLoggedIn(){
    return localStorage.getItem('login')!==null;
  }