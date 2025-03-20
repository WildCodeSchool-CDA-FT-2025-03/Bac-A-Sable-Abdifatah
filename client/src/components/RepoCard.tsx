import { Repo } from "../types/repos.type"
import { Link, useNavigate } from "react-router-dom";
import ModalRepo from "./ModalRepo";
import { useState } from "react";

type ReposCardProps = {
    repo: Repo;
    cls: string;
    deleteSelectedRepo: (id: string) => void
}
export const ReposCard = ({ repo, cls, deleteSelectedRepo }: ReposCardProps) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmAction = (): void => {
        if (repo.id) deleteSelectedRepo(repo.id)
    }
    return (
        <div className="">
            {
                <div className={cls} key={repo.id}>
                    <Link key={repo.id} to={`/repos/${repo.id}`}>
                        <p>
                            URL : {repo.url}
                        </p>

                        <p>Name : {repo.name}</p>
                        <p> Languages : {repo.languages.map((lang) => (
                            <span key={lang.node.name}>{lang.node.name}<br /></span>
                        ))}</p>
                    </Link>
                    <div className="actionButtons">
                        <button type="button" className="mr-3 mx-3 btn btn-warning" onClick={() => { navigate(`/repos/update/${repo.id}`) }} >Modifier</button>
                        <button type="button" className="delete btn btn-danger" onClick={handleShow}>Supprimer</button>
                    </div>
                    <ModalRepo handleClose={handleClose} show={show} confirmAction={confirmAction} />
                </div>
            }
        </div>
    );
}