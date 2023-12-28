import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import Login from "../../pages/Authentication/Login"
// Import Routes all

const privateRoutes = () => {
  // const [isLogged,setIsLogged]=React.useState(true)
  let auth = { token: localStorage.getItem("User")?true:false }

  return auth.token ? <Outlet /> : <Navigate to="/login" />
}

export default privateRoutes
