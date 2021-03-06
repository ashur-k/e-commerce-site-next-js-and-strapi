import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
import { MAGIC_PUBLIC_KEY } from '../utils/urls'

const AuthContext = createContext()

let magic

export const AuthProvider = (props) => {

    const [user, setUser] = useState(null)
    const router = useRouter()

    /**
     * Adds email to user
     * @param {string} email 
     */

    const loginUser = async (email) => {
        try{
            await magic.auth.loginWithMagicLink({ email })
            setUser({ email })
            router.push('/')
        }catch(error){
            setUser(null)
        }
        
    }
    /**
     * Sets the user to null
     */

    const logoutUser = async () => {
        try{
            await magic.user.logout()
            setUser(null)
            router.push('/')
        }catch(error){
            console.log("There is no possible error scenario")
        }
        
    }

    useEffect(() => {
      magic = new Magic(MAGIC_PUBLIC_KEY)  
    })

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {props.children}
        </AuthContext.Provider>
        )
}

export default AuthContext