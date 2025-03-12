import React, { forwardRef, useEffect } from 'react'
import useLanguages from '../../services/useLanguages';
type SelectFormProps = {
    name: string;
    title: string;
}
const SelectLanguage = forwardRef<HTMLSelectElement, SelectFormProps>(({ name, title }, ref) => {
    const {languages, getAllLanguages} = useLanguages();

    useEffect(()=>{
        getAllLanguages()
    },[])
    console.log(name)
  return (
      <label htmlFor="">
          {title}
          <select name={name} ref={ref} id="" >
              {languages.length > 0 && languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
              ))}
          </select>
      </label>
  )
})

export default SelectLanguage;