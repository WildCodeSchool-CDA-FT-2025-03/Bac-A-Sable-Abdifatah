import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReposCard } from '../components/RepoCard';
import { useRepos } from '../services/repos';
function Home() {
  const { repos, getAllRepos, deleteRepo } = useRepos();
  const [searchParam, setSearchParam] = useSearchParams();
  const [repoDeleted, setRepoDeleted] = useState(false);
  useEffect(() => {
    setRepoDeleted(false)
    getAllRepos(searchParam.get('limit') || '5');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, repoDeleted]);

  const deleteSelectedRepo = (id: string) => {
    deleteRepo(id)
    setRepoDeleted(true)
  }
  return (
    <>
      <p>Liste de Repo depuis mon github</p>
      <div className="box">
      <label htmlFor="">
         Nombre de repos affichés
        <select value={searchParam.get('limit') || '5'} name="limit" id="" onChange={(e) => setSearchParam({ limit: e.target.value })}>
          <option value="5" >5</option>
          <option value="10" >10</option>
          <option value="15" >15</option>
        </select>
      </label>
      </div>
      <div className="repoList">
        {
          repos.length > 0 && repos.map((repo) => (
            <ReposCard cls={"repoCard"} key={repo.id} repo={repo} deleteSelectedRepo={deleteSelectedRepo} />
          ))
        }
      </div>
    </>
  )
}

export default Home