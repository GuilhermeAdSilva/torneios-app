import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function VisualizarEquipes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/equipes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idTecnico, setIdTecnico] = useState(0);
  const [idAssociacaoEsportiva, setIdAssociacaoEsportiva] = useState(0);
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setIdTecnico(0);
      setIdAssociacaoEsportiva(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdTecnico(dados.idTecnico);
      setIdAssociacaoEsportiva(dados.idAssociacaoEsportiva);
    }
  }

  async function salvar() {
    let data = { id, nome, idTecnico, idAssociacaoEsportiva };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Equipe ${nome} cadastrada com sucesso!`);
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
          mensagemSucesso(`Equipe ${nome} alterada com sucesso!`);
          navigate(`/listagem-equipes`);
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
      setIdTecnico(dados.idTecnico);
      setIdAssociacaoEsportiva(dados.idAssociacaoEsportiva);
    }
  }

  const [dadosTecnicos, setDadosTecnicos] = React.useState(null);
  const [dadosAssociacoesEsportivas, setDadosAssociacoesEsportivas] = React.useState(null);
  
  useEffect(() => {
    axios.get(`${BASE_URL}/tecnicos`).then((response) => {
      setDadosTecnicos(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL2}/associacoesEsportivas`).then((response) => {
      setDadosAssociacoesEsportivas(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosTecnicos) return null
  if (!dadosAssociacoesEsportivas) return null

  return (
    <div className='container'>
      <Card title='Dados da Equipe'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                  disabled
                />
              </FormGroup>

              <FormGroup label='Tecnico: *' htmlFor='selectTecnico'>
                <select
                  className='form-select'
                  id='selectTecnico'
                  name='idTecnico'
                  value={idTecnico}
                  onChange={(e) => setIdTecnico(e.target.value)}
                  disabled
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTecnicos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Associação Esportiva: *' htmlFor='selectAssociacaoEsportiva'>
                <select
                  className='form-select'
                  id='selectAssociacaoEsportiva'
                  name='idAssociacaoEsportiva'
                  value={idAssociacaoEsportiva}
                  onChange={(e) => setIdAssociacaoEsportiva(e.target.value)}
                  disabled
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosAssociacoesEsportivas.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default VisualizarEquipes;
