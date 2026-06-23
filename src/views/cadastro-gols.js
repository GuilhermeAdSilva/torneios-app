import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import api from '../config/axios';
import { BASE_URL } from '../config/axios';

function CadastroGols() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/gols`;

  const [id, setId] = useState('');
  const [idPartida, setIdPartida] = useState(0);
  const [idJogadorGol, setIdJogadorGol] = useState(0);
  const [idJogadorAssistencia, setIdJogadorAssistencia] = useState(0);

  const [dadosJogadores, setDadosJogadores] = useState(null);
  const [dadosPartidas, setDadosPartidas] = useState(null);

  function inicializar(dadosAEditar = null) {
    if (idParam == null || !dadosAEditar) {
      setId('');
      setIdPartida(0);
      setIdJogadorGol(0);
      setIdJogadorAssistencia(0);
    } else {
      setId(dadosAEditar.id || '');
      setIdPartida(dadosAEditar.idPartida || dadosAEditar.partida?.id || 0);
      setIdJogadorGol(dadosAEditar.idJogadorGol || dadosAEditar.jogadorGol?.id || 0);
      setIdJogadorAssistencia(dadosAEditar.idJogadorAssistencia || dadosAEditar.jogadorAssistencia?.id || 0);
    }
  }

  async function salvar() {
    const payload = {
      id: id ? id : null,
      idPartida: idPartida > 0 ? parseInt(idPartida) : null,
      idJogadorGol: idJogadorGol > 0 ? parseInt(idJogadorGol) : null,
      idJogadorAssistencia: idJogadorAssistencia > 0 ? parseInt(idJogadorAssistencia) : null
    };

    if (idParam == null) {
      await api
        .post(baseURL, payload)
        .then(function () {
          mensagemSucesso(`Gol cadastrado com sucesso!`);
          navigate(`/listagem-gols`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || "Erro ao salvar gol.");
        });
    } else {
      await api
        .put(`${baseURL}/${idParam}`, payload)
        .then(function () {
          mensagemSucesso(`Gol alterado com sucesso!`);
          navigate(`/listagem-gols`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || "Erro ao alterar gol.");
        });
    }
  }

  useEffect(() => {
    api.get(`${BASE_URL}/jogadores`).then((response) => {
      setDadosJogadores(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`${BASE_URL}/partidas`).then((response) => {
      setDadosPartidas(response.data);
    });
  }, []);

  useEffect(() => {
    if (idParam != null) {
      api.get(`${baseURL}/${idParam}`).then((response) => {
        inicializar(response.data);
      });
    } else {
      inicializar();
    }
  }, [idParam]);

  if (!dadosJogadores || !dadosPartidas) return null;

  return (
    <div className='container'>
      <Card title={idParam ? 'Editar Gol' : 'Cadastro de Gol'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
              <FormGroup label='Partida: *' htmlFor='selectPartida'>
                <select
                  className='form-select'
                  id='selectPartida'
                  name='idPartida'
                  value={idPartida}
                  onChange={(e) => setIdPartida(e.target.value)}
                >
                  <option value='0'>Selecione uma partida...</option>
                  {dadosPartidas.map((partida) => (
                    <option key={partida.id} value={partida.id}>
                      Jogo #{partida.id} {partida.torneio?.nome ? ` - ${partida.torneio.nome}` : ''}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Autor do Gol: *' htmlFor='selectJogadorGol'>
                <select
                  className='form-select'
                  id='selectJogadorGol'
                  name='idJogadorGol'
                  value={idJogadorGol}
                  onChange={(e) => setIdJogadorGol(e.target.value)}
                >
                  <option value='0'>Selecione o jogador...</option>
                  {dadosJogadores.map((jogador) => (
                    <option key={jogador.id} value={jogador.id}>
                      {jogador.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Assistência (Opcional):' htmlFor='selectJogadorAssistencia'>
                <select
                  className='form-select'
                  id='selectJogadorAssistencia'
                  name='idJogadorAssistencia'
                  value={idJogadorAssistencia}
                  onChange={(e) => setIdJogadorAssistencia(e.target.value)}
                >
                  <option value='0'>Nenhuma assistência (Gol individual)</option>
                  {dadosJogadores.map((jogador) => (
                    <option key={jogador.id} value={jogador.id}>
                      {jogador.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row' className="mt-4">
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={() => navigate('/listagem-gols')}
                  type='button'
                  className='btn btn-danger'
                >
                  Voltar
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