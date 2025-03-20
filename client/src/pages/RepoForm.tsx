import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputFormGroup from '../components/forms/InputFormGroup';
import { useEffect, useState } from 'react';
import { Repo } from '../types/repos.type';
import { useRepos } from '../services/repos';
import useLanguages from '../services/useLanguages';
import { Navigate, useParams } from 'react-router-dom';
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
    const [newRepo, setNewRepo] = useState<Repo>(initialRepo);
    const [redirect, setRedirect] = useState(false);
    const [createdId, setCreatedId] = useState('');
    const { languages, getAllLanguages } = useLanguages();
    const { id } = useParams();
    const { addNewRepo, updateRepo, getOneRepos, oneRepos } = useRepos();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllLanguages();
                if (id) {
                    await getOneRepos(id as string);
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (id) {
            if (oneRepos) {
                setNewRepo({
                    name: oneRepos.name,
                    url: oneRepos.url,
                    languages: oneRepos.languages,
                    isPrivate: oneRepos.isPrivate
                })
            }
            console.log(oneRepos);
        }
    }, [oneRepos, id])


    const handleNewRepo = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        if (e.target.name === "languages") {
            setNewRepo((prev) => ({
                ...prev, languages: [{ size: 0, node: { name: e.target.value } }]
            }))
        } else {
            setNewRepo({ ...newRepo, [e.target.name]: e.target.value })
        }
    }

    const handleSubmitRepo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newRepo)
        if (id) {
            const updatedRepo = await updateRepo(newRepo, id)
            if (updatedRepo) {
                setCreatedId(id)
                console.log(updatedRepo)
            }
        } else {
            const createdRepo = await addNewRepo(newRepo)
            if (createdRepo) {
                setCreatedId(createdRepo.data.createdRepoId)
            }
        }
        setRedirect(true)

    }
    if (redirect) {
        return <Navigate to={`/repos/${createdId}`} replace />;
    }
    return (
        <Form className='create-repo' onSubmit={handleSubmitRepo}>
            <h1>Créer une repo</h1>
            {oneRepos && oneRepos.name}
            <InputFormGroup label="Le nom de repo" name="name" type="text" value={newRepo.name} handleNewRepo={handleNewRepo} />
            <InputFormGroup label="URL" name="url" type="text" value={newRepo.url} handleNewRepo={handleNewRepo} />

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Selectionner une langue</Form.Label>
                <Form.Select aria-label="Default select example" name="languages" value={newRepo.languages[0].node.name} onChange={handleNewRepo}>
                    {languages.length > 0 && languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    id={`formBasicCheckbox`}
                    label={`Repo privée`}
                    name='isPrivate'
                    checked={newRepo.isPrivate}
                    onChange={(e) => { setNewRepo({ ...newRepo, [e.target.name]: !newRepo.isPrivate }) }}
                />
            </Form.Group>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button variant="btn btn-success me-md-2" type="submit">
                    Créer
                </Button>
            </div>
        </Form>
    );
}
