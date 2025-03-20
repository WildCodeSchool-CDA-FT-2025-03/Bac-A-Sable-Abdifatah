import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useRepos } from '../services/repos';

export default function Repo() {
    const { id } = useParams();
    const { getOneRepos, oneRepos } = useRepos();
    useEffect(() => {
        getOneRepos(id as string);
    }, [id]);
    return (
        <>
            {oneRepos && 
                <div className='create-repo' key={oneRepos.id}>
                    <p>URL : <a href={oneRepos.url}> {oneRepos.url}</a></p>
                    <p>Name : {oneRepos.name}</p>
                    <p> Languages : {oneRepos.languages.map((lang) => (
                            <span key={lang.node.name}>{lang.node.name}<br /></span>
                        ))}</p>
                </div>
            }
        </>
    )
}
