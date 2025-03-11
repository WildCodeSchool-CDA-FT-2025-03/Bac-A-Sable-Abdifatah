import { Link } from 'react-router-dom';
import { ReposCard } from '../components/RepoCard';
import { useRepos } from '../services/repos';
function Home() {
  const { repos } = useRepos();
  return (
    <>
      <p>Liste de Repo depuis mon github</p>
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