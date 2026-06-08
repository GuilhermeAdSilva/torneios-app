import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { FormControl } from '@mui/material';

function VisualizarTorneios() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/torneios`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [formato, setFormato] = useState('');
  const [quantidadeEquipes, setQuantidadeEquipes] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setFormato('');
      setQuantidadeEquipes('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setFormato(dados.formato);
      setQuantidadeEquipes(dados.quantidadeEquipes);
      setDescricao(dados.descricao);
    }
  }

 
  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setFormato(dados.formato);
      setQuantidadeEquipes(dados.quantidadeEquipes);
      setDescricao(dados.descricao);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Dados do Torneio'>
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
                  disabled
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Formato: *' htmlFor='selectFormato'>
                <select
                  className='form-select'
                  id='selectFormato'
                  name='idFormato'
                  value={formato}
                  disabled
                  onChange={(e) => setFormato(e.target.value)}
                >
                  <option value='0'>
                    {' '}
                  </option>
                  <option value='PONTOS_CORRIDOS'>
                    {'Pontos Corridos'}
                  </option>
                  <option value='MATA_MATA'>
                    {'Mata-Mata'}
                  </option>
                  <option value='FASE_DE_GRUPOS'>
                    {'Fase de Grupos'}
                  </option>
                </select>
              </FormGroup>
              <FormGroup label='Quantidade de Equipes: *' htmlFor='selectQuantidadeEquipes'>
                <input
                  type='number'
                  id='inputQuantidadeEquipes'
                  value={quantidadeEquipes}
                  className='form-control'
                  name='quantidadeEquipes'
                  min={2}
                  disabled
                  onChange={(e) => setQuantidadeEquipes(e.target.value)}
                />
              </FormGroup>


              <FormGroup label='Descrição: *' htmlFor='selectDescricao'>
                <input
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  name='descricao'
                  disabled
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default VisualizarTorneios;
