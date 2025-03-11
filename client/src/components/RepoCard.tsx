import { Repo } from "../types/repos.type"

type ReposCardProps = {
    repo: Repo;
    cls: string;
}
export const ReposCard = ({ repo, cls }: ReposCardProps) => {
    console.log(cls)
    return (
        <div>
            {
                <div className={cls} key={repo.id}>
                    <p>URL : <a href={repo.url}> {repo.url}</a></p>
                    <p>Name : {repo.name}</p>
                    <p> Languages : {repo.languages.map((lang) => (
                        <span key={lang.node.name}>{lang.node.name}<br /></span>
                    ))}</p>
                </div>
            }
        </div>
    );
}