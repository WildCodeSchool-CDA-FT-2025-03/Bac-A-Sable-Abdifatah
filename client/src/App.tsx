import './App.css'
import { ReposCard } from './components/RepoCard';
import { useRepos } from './services/repos'

function App() {

  const { repos } = useRepos();
  console.log(repos)
  return (
    <>
      <p>Liste de Repo depuis mon github</p>
      <div className="repoList">
        {
          repos.length > 0 && repos.map((repo) => (
            <ReposCard cls={"repoCard"} key={repo.id} repo={repo} />
          ))
        }
      </div>
    </>
  )
}

export default App
