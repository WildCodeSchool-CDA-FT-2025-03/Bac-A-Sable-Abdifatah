import { useState } from "react";
import { Repo } from "../types/repos.type";
import { client } from "./client";

export const useRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [oneRepos, setOneRepos] = useState<Repo>();

  const getAllRepos = async (limit: string) => {
    client
      .get(`/repos?limit=${limit}`)
      .then((repos) => {
        setRepos(repos.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getOneRepos = (id: string) => {
    client
      .get(`/repos/${id}`)
      .then((repo) => {
        setOneRepos(repo.data as Repo);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewRepo = async (repo: Repo) => {
    try {
      return await client.post("/repos", repo);
    } catch (error) {
      console.error(error);
    }
  };

    const updateRepo = async (repo: Repo, id: string) => {
      try {
        return await client.put(`/repos/${id}`, repo);
      } catch (error) {
        console.error(error);
      }
    };

    const deleteRepo = async (id: string) => {
      try {
        await client.delete(`/repos/${id}`);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      repos,
      oneRepos,
      getOneRepos,
      getAllRepos,
      addNewRepo,
      updateRepo,
      deleteRepo,
    };
};
