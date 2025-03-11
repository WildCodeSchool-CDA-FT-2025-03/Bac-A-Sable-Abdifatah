import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ReposCard } from '../components/RepoCard';
import { useRepos } from '../services/repos';
function Home() {
  const { repos, getAllRepos } = useRepos();
  const [searchParam, setSearchParam] = useSearchParams();
    useEffect(() => {
    getAllRepos(searchParam.get('limit') || '5');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

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
            <Link key={repo.id} to={`/repos/${repo.id}`}> <ReposCard cls={"repoCard"} key={repo.id} repo={repo} /></Link>
          ))
        }
      </div>
    </>
  )
}

export default Home