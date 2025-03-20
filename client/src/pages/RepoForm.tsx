import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputFormGroup from '../components/forms/InputFormGroup';
import { useEffect, useRef, useState } from 'react';
import { Repo } from '../types/repos.type';
import { useRepos } from '../services/repos';
import useLanguages from '../services/useLanguages';
import { Navigate } from 'react-router-dom';

export default function RepoForm() {
    const inputName = useRef<HTMLInputElement>(null);
    const inputUrl = useRef<HTMLInputElement>(null);
    const selectLanguages = useRef<HTMLSelectElement>(null);
    const inputIsPrivate = useRef<HTMLInputElement>(null);
    const { languages, getAllLanguages } = useLanguages();

    useEffect(() => {
        getAllLanguages()
    }, [])
    const { addNewRepo } = useRepos();
    const [redirect, setRedirect] = useState(false);
    const [createdId, setCreatedId] = useState(null);
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
                    isPrivate: inputIsPrivate.current?.checked,
                    languages: [
                        {
                            size: 0,
                            node: { name: selectLanguages.current?.value }
                        }
                    ]

                }
                const createdRepo = await addNewRepo(newRepo);
                if (createdRepo) {
                    setCreatedId(createdRepo.data.createdRepoId)
                }
                setRedirect(true);
            } else {
                throw new Error("invalid from")
            }
        } catch (error) {
            console.error(error)
        }
    }
    if (redirect) {
        return <Navigate to={`/repos/${createdId}`} replace />;
    }

    return (
        <Form className='create-repo' onSubmit={handleSubmitRepo}>
            <h1>Créer une repo</h1>
            <InputFormGroup label="Le nom de repo" name="name" type="text" ref={inputName} />
            <InputFormGroup label="URL" name="url" type="text" ref={inputUrl} />

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Selectionner une langue</Form.Label>
                <Form.Select aria-label="Default select example" name="languages" ref={selectLanguages}>
                    {languages.length > 0 && languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Repo privé" ref={inputIsPrivate} />
            </Form.Group>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button variant="btn btn-success me-md-2" type="submit">
                    Créer
                </Button>
            </div>
        </Form>
    );
}
