import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
import { FormControl } from '@mui/material';

function VisualizarTorneios() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/torneios`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [formato, setFormato] = useState('');
  const [quantidadeEquipesMaxima, setQuantidadeEquipesMaxima] = useState('');
  const [tamanhoMaximoElenco, setTamanhoMaximoElenco] = useState('');
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setFormato('');
      setQuantidadeEquipesMaxima('');
      setTamanhoMaximoElenco('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setFormato(dados.formato);
      setQuantidadeEquipesMaxima(dados.quantidadeEquipesMaxima);
      setTamanhoMaximoElenco(dados.tamanhoMaximoElenco);
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
      setQuantidadeEquipesMaxima(dados.quantidadeEquipesMaxima);
      setTamanhoMaximoElenco(dados.tamanhoMaximoElenco);
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
                  onChange={(e) => setNome(e.target.value)}
                  disabled
                />
              </FormGroup>
              <FormGroup label='Formato: *' htmlFor='selectFormato'>
                <select
                  className='form-select'
                  id='selectFormato'
                  name='idFormato'
                  value={formato}
                  onChange={(e) => setFormato(e.target.value)}
                  disabled
                >
                  <option value='0'>
                    {' '}
                  </option>
                  <option value='Pontos Corridos'>
                    {'Pontos Corridos'}
                  </option>
                  <option value='Mata-Mata'>
                    {'Mata-Mata'}
                  </option>
                  <option value='Fase de Grupos'>
                    {'Fase de Grupos'}
                  </option>
                </select>
              </FormGroup>
              <FormGroup label='Quantidade de Equipes: *' htmlFor='selectQuantidadeEquipesMaxima'>
                <select
                  className='form-select'
                  id='selectQuantidadeEquipesMaxima'
                  name='idQuantidadeEquipesMaxima'
                  value={quantidadeEquipesMaxima}
                  onChange={(e) => setQuantidadeEquipesMaxima(e.target.value)}
                  disabled
                >
                  <option value='0'>
                    {' '}
                  </option>
                  <option value='4'>
                    {'4'}
                  </option>
                  <option value='8'>
                    {'8'}
                  </option>
                  <option value='16'>
                    {'16'}
                  </option>
                </select>
              </FormGroup>

              <FormGroup label='Tamanho Máximo de elenco: *' htmlFor='selectTamanhoMaximoElenco'>
                <select
                  className='form-select'
                  id='selectTamanhoMaximoElenco'
                  name='idTamanhoMaximoElenco'
                  value={tamanhoMaximoElenco}
                  onChange={(e) => setQuantidadeEquipesMaxima(e.target.value)}
                  disabled
                >
                  <option value='0'>
                    {' '}
                  </option>
                  <option value='18'>
                    {'18'}
                  </option>
                  <option value='23'>
                    {'23'}
                  </option>
                  <option value='26'>
                    {'26'}
                  </option>
                </select>
              </FormGroup>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default VisualizarTorneios;
