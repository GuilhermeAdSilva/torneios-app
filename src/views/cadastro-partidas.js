import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroPartidas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/partidas`;

  const [id, setId] = useState('');
  const [idTorneio, setIdTorneio] = useState(0);
  const [nomeTorneio, setNomeTorneio] = useState(0);
  const [idResultado, setIdResultado] = useState(0);
  const [status, setStatus] = useState(0);
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdTorneio("");
      setNomeTorneio("");
      setIdResultado("");
      setStatus("");
    } else {
      setId(dados.id);
      setIdTorneio(dados.idTorneio);
      setNomeTorneio(dados.nomeTorneio);
      setIdResultado(dados.idResultado);
      setStatus(dados.status);
    }
  }

  async function salvar() {
    let data = { id, idTorneio, nomeTorneio, idResultado, status};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Partida cadastrada com sucesso!`);  
          navigate(`/listagem-partidas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Partida alterada com sucesso!`);
          navigate(`/listagem-partidas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setIdTorneio(dados.idTorneio);
      setNomeTorneio(dados.nomeTorneio);
      setIdResultado(dados.idResultado);
      setStatus(dados.status);
    }
  }

  const [dadosTorneio, setDadosTorneio] = React.useState(null);
  
  useEffect(() => {
    axios.get(`${BASE_URL}/torneios`).then((response) => {
      setDadosTorneio(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosTorneio) return null

  return (
    <div className='container'>
      <Card title={`Cadastrar partida`}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
    
              <FormGroup label='Torneio: *' htmlFor='selectTorneio'>
                <select
                  className='form-select'
                  id='selectTorneio'
                  name='idTorneio'
                  value={idTorneio}
                  onChange={(e) => setIdTorneio(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTorneio.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

               <FormGroup label='Status: *' htmlFor='inputStatus'>
                <input
                  type = "text"
                  className='form-control'
                  id='inputLocal'
                  name='status'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroPartidas;
