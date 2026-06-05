import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function ProcurarInscricoes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL3}/inscricoes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idEquipe, setIdEquipe] = useState(0);
  const [idEdicaoTorneio, setIdEdicaoTorneio] = useState(0);
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setIdEquipe(0);
      setIdEdicaoTorneio(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdEquipe(dados.idEquipe);
      setIdEdicaoTorneio(dados.idEdicaoTorneio);
    }
  }

  async function salvar() {
    let data = { id, nome, idEquipe, idEdicaoTorneio };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Inscrição ${nome} cadastrada com sucesso!`);  
          navigate(`/listagem-equipes`);
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
          mensagemSucesso(`Inscrição ${nome} alterada com sucesso!`);
          navigate(`/listagem-inscricoes`);
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
      setNome(dados.nome);
      setIdEquipe(dados.idEquipe);
      setIdEdicaoTorneio(dados.idEdicaoTorneio);
    }
  }

  const [dadosEquipes, setDadosEquipes] = React.useState(null);
  const [dadosEdicoesTorneios, setDadosEdicoesTorneios] = React.useState(null);
  
  useEffect(() => {
    axios.get(`${BASE_URL2}/equipes`).then((response) => {
      setDadosEquipes(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL2}/EdicoesTorneios`).then((response) => {
      setDadosEdicoesTorneios(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosEquipes) return null
  if (!dadosEdicoesTorneios) return null

  return (
    <div className='container'>
      <Card title={`Inscrever em Competição`}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
    
              <FormGroup label='Equipe: *' htmlFor='selectEquipe'>
                <select
                  className='form-select'
                  id='selectEquipe'
                  name='idEquipe'
                  value={idEquipe}
                  onChange={(e) => setIdEquipe(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosEquipes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Edição Torneio: *' htmlFor='selectEdicaoTorneio'>
                <select
                  className='form-select'
                  id='selectEdicaoTorneio'
                  name='idEdicaoTorneio'
                  value={idEdicaoTorneio}
                  onChange={(e) => setIdEdicaoTorneio(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosEdicoesTorneios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeEdicao}
                    </option>
                  ))}
                </select>
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

export default ProcurarInscricoes;
