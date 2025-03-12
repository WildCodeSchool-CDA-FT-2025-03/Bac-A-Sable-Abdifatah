import  { useState } from 'react'
import { client } from './client'
// import { Languages } from '../types/languages.type'

const useLanguages = () => {
    const [languages, setLanguages] = useState<string[]>([])

    const getAllLanguages = ()=> {
        client.get('/languages')
        .then((languages) => {
            setLanguages(languages.data)
        })
        .catch((error) => { 
            console.error(error)
        }
        )
    }

    return {languages, getAllLanguages}
}

export default useLanguages