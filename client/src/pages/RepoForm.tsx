import React from 'react'
import { Repo } from '../types/repos.type';
import InputForm from '../components/forms/InputForm';
import SelectLanguage from '../components/forms/SelectLanguage';

const initialRepo = {
    name: "",
    url: "",
    languages: [{
        size: 0,
        node: {
            name: ""
        }
    }],
    isPrivate: false
}

export default function RepoForm() {
    const [newRepo, setNewRepo] = React.useState<Repo>(initialRepo);

    const handleNewRepo = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        if(e.target.name === "languages"){
            setNewRepo((prev) => ({
                ...prev, languages: [{size:0, node:{name: e.target.value}}]
            }))
        }else{
            setNewRepo({ ...newRepo, [e.target.name]: e.target.value })
        }
    }

    const handleSubmitRepo = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(newRepo)
    }
    return (

        <div>
            <h1>Repo Form</h1>
            <form onSubmit={handleSubmitRepo}>
                <InputForm 
                name='name'
                title='Repo Name'
                value={newRepo.name}
                handleNewRepo={handleNewRepo}
                />
                <InputForm
                    name='url'
                    title='Repo URL'
                    value={newRepo.url}
                    handleNewRepo={handleNewRepo}
                />
                <SelectLanguage 
                name='languages'
                title='Repo Languages'
                value={newRepo.languages[0].node.name}
                handleNewRepo={handleNewRepo}
                />
                <label htmlFor="">
                    Repo isPrivate
                    <input type="checkbox" name='isPrivate' checked={newRepo.isPrivate} onChange={(e) => { setNewRepo({ ...newRepo, [e.target.name]: !newRepo.isPrivate }) }} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
