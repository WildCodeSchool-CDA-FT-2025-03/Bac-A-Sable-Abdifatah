import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
      <div className="header">
        <h1>Liste de Repo depuis mon github</h1>
        <Link to={"/repos/create"}>Ajouter une repo</Link><br />
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
            <ReposCard cls={"repoCard shadow-lg p-3 mb-5 rounded"} key={repo.id} repo={repo} deleteSelectedRepo={deleteSelectedRepo} />
          ))
        }
      </div>
    </>
  )
}

export default Home