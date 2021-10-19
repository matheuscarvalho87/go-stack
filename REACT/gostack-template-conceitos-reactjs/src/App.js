import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
      console.log(response);
    });
  }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repositorio ${Date.now()}`,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((reposisitory) => (
          <li key={reposisitory.id}>
            {reposisitory.title}
            <button onClick={() => handleRemoveRepository(reposisitory.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
