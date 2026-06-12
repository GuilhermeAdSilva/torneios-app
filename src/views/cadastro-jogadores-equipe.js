import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroJogadoresEquipe() {
  const navigate = useNavigate();

  const { idEquipe } = useParams();

  const baseURL = `${BASE_URL}/jogadores`;

  const [jogador, setJogador] = useState(null);
  const [idJogador, setIdJogador] = useState(0);

  const [dadosJogadores, setDadosJogadores] = useState([]);

  useEffect(() => {
    carregarJogadores();
  }, []);

  async function carregarJogadores() {
    try {
      const response = await axios.get(baseURL);

      setDadosJogadores(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar jogadores');
    }
  }

  async function selecionarJogador(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);

      setJogador(response.data);
      setIdJogador(id);
    } catch (error) {
      mensagemErro('Erro ao carregar jogador');
    }
  }

  async function salvar() {
    if (!jogador) {
      mensagemErro('Selecione um jogador');
      return;
    }

    try {
      const jogadorAtualizado = {
        ...jogador,
        idEquipe: Number(idEquipe)
      };

      await axios.put(
        `${baseURL}/${jogador.id}`,
        jogadorAtualizado,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      mensagemSucesso('Jogador associado à equipe com sucesso!');

      navigate('/listagem-equipes');
    } catch (error) {
      mensagemErro(
        error?.response?.data ||
          'Erro ao associar jogador à equipe'
      );
    }
  }

  return (
    <div className='container'>
      <Card title='Adicionar Jogador à Equipe'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup
                label='Jogador: *'
                htmlFor='selectJogador'
              >
                <select
                  className='form-select'
                  id='selectJogador'
                  value={idJogador}
                  onChange={(e) =>
                    selecionarJogador(e.target.value)
                  }
                >
                  <option value='0'>
                    Selecione um jogador
                  </option>

                  {dadosJogadores.map((dado) => (
                    <option
                      key={dado.id}
                      value={dado.id}
                    >
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack
                spacing={1}
                padding={1}
                direction='row'
              >
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>

                <button
                  onClick={() =>
                    navigate('/listagem-equipes')
                  }
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

export default CadastroJogadoresEquipe;