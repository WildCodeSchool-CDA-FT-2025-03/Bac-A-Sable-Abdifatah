import React, { useEffect } from 'react'
import useLanguages from '../../services/useLanguages';
type SelectFormProps = {
    value: string;
    name: string;
    title: string;
    handleNewRepo: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
export default function SelectLanguage({ value, name, title, handleNewRepo }: SelectFormProps ) {
    const {languages, getAllLanguages} = useLanguages();

    useEffect(()=>{
        getAllLanguages()
    },[])
    console.log(name)
  return (
      <label htmlFor="">
          {title}
          <select name={name} value={value} id="" onChange={handleNewRepo}>
              {languages.length > 0 && languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
              ))}
          </select>
      </label>
  )
}

