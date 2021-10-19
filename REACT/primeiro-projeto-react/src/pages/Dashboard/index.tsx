import React,{ useState, FormEvent,useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import {Link} from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository{
  full_name: string;
  description:string;
  owner:{
    login:string;
    avatar_url:string;
  };
}

const Dashboard : React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError,setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() =>{
    const storagedRepositories = localStorage.getItem('@GithubExplorer.rep:repositories');
    if(storagedRepositories){
      return JSON.parse(storagedRepositories);
    }
    return[];
  });

  useEffect(()=>{
    //para o localSorage não conflitar com outros localStarages que estão no mesmo endereço, deve-se nomear (@nomeDaAplicacao:oqueQuerArmazenar) ex:@GithubExplorer.rep:repositories
    //JSON.stringfy : nao se salva arrays no localStorage, então converte em array
    localStorage.setItem('@GithubExplorer.rep:repositories',JSON.stringify(repositories));
  },[repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>):Promise<void>{
    event.preventDefault();

    if(!newRepo){
      setInputError('Digite o nome do repositorio');
      return;
    }
    // Sem essa definição a pagina recarrega ao dar o submit no botão

    // Adição de um novo repositório
    try{
      const response = await api.get(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories,repository]);
      setNewRepo('');
      setInputError('');
    }catch(err){
      setInputError('Erro na busca por esse repositório');
    }


  }
  return (
    <>
      <img src={logoImg} alt="Github Explores" className="src"/>
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
        value={newRepo}
        onChange ={(e)=>setNewRepo(e.target.value)}
        type="text"
        placeholder="Digite o nome do repositório"/>
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
      {repositories.map(repository =>(
        <Link key={repository.full_name} to ={`/repositories/${repository.full_name}`}>
        <img
        src={repository.owner.avatar_url}
        alt={repository.owner.login}
        />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>

        <FiChevronRight size={20}/>
      </Link>
      ))}
    </Repositories>
    </>




  )


}
 export default Dashboard;
