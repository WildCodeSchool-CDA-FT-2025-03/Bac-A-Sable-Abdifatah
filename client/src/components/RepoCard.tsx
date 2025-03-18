import { Repo } from "../types/repos.type"
import { Link } from "react-router-dom";

type ReposCardProps = {
    repo: Repo;
    cls: string;
    deleteSelectedRepo: (id: string) => void
}
export const ReposCard = ({ repo, cls, deleteSelectedRepo }: ReposCardProps) => {


    const editRepo = (): void => {
    }


    return (
        <div>
            {
                <div className={cls} key={repo.id}>
                    <Link key={repo.id} to={`/repos/${repo.id}`}>
                        <p>URL : {repo.url}</p>
                        <p>Name : {repo.name}</p>
                        <p> Languages : {repo.languages.map((lang) => (
                            <span key={lang.node.name}>{lang.node.name}<br /></span>
                        ))}</p>
                    </Link>
                    <div className="actionButtons">
                        <button type="button" className="edit" onClick={editRepo} >Modifier</button>
                        <button type="button" className="delete" onClick={() => { if (repo.id) deleteSelectedRepo(repo.id) }}>Supprimer</button>
                    </div>

                </div>
            }
        </div>
    );
}