import React, { useRef } from 'react'
// import { Repo } from '../types/repos.type';
import InputForm from '../components/forms/InputForm';
import SelectLanguage from '../components/forms/SelectLanguage';
import { Repo } from '../types/repos.type';
import { useRepos } from '../services/repos';

// const initialRepo = {
//     name: "",
//     url: "",
//     languages: [{
//         size: 0,
//         node: {
//             name: ""
//         }
//     }],
//     isPrivate: false
// }

export default function RepoForm() {
    // const [newRepo, setNewRepo] = React.useState<Repo>(initialRepo);
    const inputName = useRef<HTMLInputElement>(null);
    const inputUrl = useRef<HTMLInputElement>(null);
    const inputIsPrivate = useRef<HTMLInputElement>(null);
    const selectLanguages = useRef<HTMLSelectElement>(null);
    const { addNewRepo } = useRepos();
    // const handleNewRepo = (
    //     e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    // ) => {
    //     if(e.target.name === "languages"){
    //         setNewRepo((prev) => ({
    //             ...prev, languages: [{size:0, node:{name: e.target.value}}]
    //         }))
    //     }else{
    //         setNewRepo({ ...newRepo, [e.target.name]: e.target.value })
    //     }
    // }

    const handleSubmitRepo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (
                inputName.current &&
                inputUrl.current &&
                inputIsPrivate.current &&
                selectLanguages.current
            ) {
                const newRepo: Repo = {
                    name: inputName.current?.value,
                    url: inputUrl.current?.value,
                    isPrivate: inputIsPrivate.current?.value === "on" ? true : false,
                    languages: [
                        {
                            size: 0,
                            node: { name: selectLanguages.current?.value }
                        }
                    ]

                }
                console.log(newRepo)
                await addNewRepo(newRepo)
            } else {
                throw new Error("invalid from")
            }
        } catch (error) {
            console.error(error)
        }
        // console.log(newRepo)
    }
    return (

        <div>
            <h1>Repo Form</h1>
            <form onSubmit={handleSubmitRepo}>
                <InputForm 
                name='name'
                title='Repo Name'
                    ref={inputName}
                />
                <InputForm
                    name='url'
                    title='Repo URL'
                    ref={inputUrl}
                />
                <SelectLanguage 
                name='languages'
                title='Repo Languages'
                    ref={selectLanguages}
                />
                <label htmlFor="">
                    Repo isPrivate
                    <input type="checkbox" name='isPrivate' ref={inputIsPrivate} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
