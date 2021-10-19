import React, { useState,FormEvent } from 'react';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import {Title,Form,Repositories} from './styles';

interface Repository{
  full_name: string;
  description:string;
  owner:{
    login:string;
    avatar_url:string;
  }
}

const Dashboard: React.FC = () =>{
  const [newRepo,setNewRepo] = useState<string>("");
  const [repositories,setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault();

    const response = await api.get(`repos/${newRepo}`);
    const repository = response.data;
    
    setRepositories([...repositories,repository]);

  }
  
  return (
    <>
      <img src={logoImg} alt="Github Exploreadr" className="src"/>
      <Title>Explore repositórios no Github</Title>
      <Form onSubmit={handleAddRepository}>
        <input 
        value={newRepo}
        onChange ={(e)=>setNewRepo(e.target.value)}
        type="text"
        placeholder="Digite o nome do repositório"/>        
        <button type="submit">Pesquisar</button>
      </Form> 
      <Repositories>
        {repositories.map((repository)=>(
          <a key={repository.full_name} href="teste">
            <img src={repository.owner.avatar_url}
            alt={repository.owner.login}/>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </a>
        ))}
        
      </Repositories>       
    </>
  );
}

export default Dashboard;