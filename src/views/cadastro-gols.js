import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL4 } from '../config/axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';

function CadastroGols() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL4}/gols`;

  const [id, setId] = useState('');
  const [idJogador, setIdJogador] = useState(0);
  const [idCompeticao, setIdCompeticao] = useState(0);
  const [minuto, setMinuto] = useState('');
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdJogador(0);
      setIdCompeticao(0);
      setMinuto('')
    } else {
      setId(dados.id);
      setIdJogador(dados.idJogador);
      setIdCompeticao(dados.idCompeticao);
      setMinuto(dados.minuto);
    }
  }

  async function salvar() {
    let data = { id, idJogador, idCompeticao, minuto };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Gol cadastrado com sucesso!`);
          navigate(`/listagem-gols`);
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
          mensagemSucesso(`Gol alterado com sucesso!`);
          navigate(`/listagem-gols`);
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
      setIdJogador(dados.idJogador);
      setIdCompeticao(dados.idCompeticao);
      setMinuto(dados.minuto);
    }
  }

  const [dadosJogadores, setDadosJogadores] = React.useState(null);
  const [dadosCompeticoes, setDadosCompeticoes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/jogadores`).then((response) => {
      setDadosJogadores(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL2}/edicoesTorneios`).then((response) => {
      setDadosCompeticoes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosJogadores) return null;
  if (!dadosCompeticoes) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Gol'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
                <FormGroup label='Jogador: *' htmlFor='selectJogadores'>
                <select
                  className='form-select'
                  id='selectJogadores'
                  name='idJogadores'
                  value={idJogador}
                  onChange={(e) => setIdJogador(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosJogadores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Competição: *' htmlFor='selectCompeticao'>
                <select
                  className='form-select'
                  id='selectCompeticao'
                  name='idCompeticao'
                  value={idCompeticao}
                  onChange={(e) => setIdCompeticao(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosCompeticoes.map((dado) => (
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

export default CadastroGols;
