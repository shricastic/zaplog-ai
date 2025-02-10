import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/AuthContext'

const AuthRoute = ({ children }: React.PropsWithChildren) => {
const { user } = useAuth()
    if(!navigator.onLine){
      return <Navigate to="*" replace />
    }
  
    if (user) {
      return <Navigate to="/blogs" replace />
    }
    
    return children
}

export default AuthRoute