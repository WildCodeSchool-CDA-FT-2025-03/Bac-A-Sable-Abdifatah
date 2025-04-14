import  { useState } from 'react'
import { client } from './client'

const useLanguages = () => {
    const [languages, setLanguages] = useState<string[]>([])

    const getAllLanguages = ()=> {
        client.get<string[]>('/languages')
        .then((languages) => {
            setLanguages(languages.data)
        })
            .catch((error: unknown) => { 
            console.error(error)
        }
        )
    }

    return {languages, getAllLanguages}
}

export default useLanguages