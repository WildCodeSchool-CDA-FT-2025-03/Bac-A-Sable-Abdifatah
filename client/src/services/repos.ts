import { useState, useEffect } from "react";
import { Repo } from "../types/repos.type";
import { client } from "./client";

export const useRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
    console.log(import.meta.env.VITE_API_URL)
  useEffect(() => {
      client.get("/repos")
      .then((repos) => {
        console.log(repos.data)
        setRepos(repos.data);
      })
      .catch((error) =>{
        console.error(error)
      })
  }, []);
  console.log(repos)
  return { repos };
};


