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

function VisualizarAssociacoesEsportivas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/associacoesEsportivas`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idPresidente, setIdPresidente] = useState(0);
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setIdPresidente(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdPresidente(dados.idPresidente);
    }
  }

  async function salvar() {
    let data = { id, nome, idPresidente };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Associacao Esportiva ${nome} cadastrada com sucesso!`);
          navigate(`/listagem-associacoes-esportivas`);
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
          mensagemSucesso(`Associacao Esportiva ${nome} alterada com sucesso!`);
          navigate(`/listagem-associacoes-esportivas`);
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
      setIdPresidente(dados.idPresidente);
    }
  }

  const [dadosPresidentes, setDadosPresidentes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/presidentes`).then((response) => {
      setDadosPresidentes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosPresidentes) return null;

  return (
    <div className='container'>
      <Card title='Dados da Associacao Esportiva'>
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
              <FormGroup label='Presidente: *' htmlFor='selectPresidente'>
                <select
                  className='form-select'
                  id='selectPresidente'
                  name='idPresidente'
                  value={idPresidente}
                  onChange={(e) => setIdPresidente(e.target.value)}
                  disabled
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosPresidentes.map((dado) => (
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

export default VisualizarAssociacoesEsportivas;
