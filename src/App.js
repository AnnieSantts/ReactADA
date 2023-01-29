
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Por favor, informe o CEP")
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } catch {
      alert("ops, erro ao buscar")
      setInput("")
    }
  }
  return (
    <div className="container">

      <h1 className="title"> Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="rgb(145 65 196)" />
        </button >
      </div>

      {Object.keys(cep).length > 1 && (

        <main className='main'>
          <h2> CEP:{cep.cep}</h2>

          <span> {cep.logradouro} </span>
          <span> {cep.complemento} </span>
          <span> Bairro: {cep.bairro}</span>
          <span></span>
          <span> Cidade: {cep.localidade}- {cep.uf}</span>


        </main>
      )}

    </div>
  );
}

export default App;
