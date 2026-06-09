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

  const { idEquipe: idEquipeParam } = useParams();

  const [idEquipe, setIdEquipe] = useState(0);
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [idJogador, setIdJogador] = useState(0);

  const [dadosJogadores, setDadosJogadores] = useState(null);
  const [dadosTimes, setDadosTimes] = useState(null);

  function inicializar() {
    setIdJogador(0);
  }

  async function salvar() {
    try {
      const jogador = dadosJogadores.find(
        (j) => j.id === Number(idJogador)
      );

      if (!jogador) {
        mensagemErro('Selecione um jogador');
        return;
      }

      const equipe = dadosTimes.find(
        (e) => e.id === Number(idEquipe)
      );

      if (!equipe) {
        mensagemErro('Equipe não encontrada');
        return;
      }

      const jogadorAtualizado = {
        ...jogador,
        idEquipe: equipe.id,
        nomeEquipe: equipe.nome,
      };

      await axios.put(
        `${BASE_URL}/jogadores/${idJogador}`,
        jogadorAtualizado
      );

      mensagemSucesso('Jogador adicionado à equipe com sucesso!');

      navigate(`/listagem-jogadores-equipe/${idEquipe}`);
    } catch (error) {
      mensagemErro(
        error?.response?.data || 'Erro ao adicionar jogador à equipe'
      );
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/jogadores`).then((response) => {
      setDadosJogadores(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/equipes`).then((response) => {
      setDadosTimes(response.data);
    });
  }, []);

  useEffect(() => {
    if (idEquipeParam && dadosTimes) {
      const equipe = dadosTimes.find(
        (e) => e.id === Number(idEquipeParam)
      );

      if (equipe) {
        setIdEquipe(equipe.id);
        setNomeEquipe(equipe.nome);
      }
    }
  }, [idEquipeParam, dadosTimes]);

  if (!dadosJogadores || !dadosTimes) {
    return null;
  }

  return (
    <div className="container">
      <Card title="Adicionar Jogador na Equipe">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <FormGroup label="Equipe:" htmlFor="selectEquipe">
                <select
                  className="form-select"
                  id="selectEquipe"
                  value={idEquipe}
                  disabled
                >
                  <option value={0}></option>

                  {dadosTimes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Jogador:" htmlFor="selectJogador">
                <select
                  className="form-select"
                  id="selectJogador"
                  value={idJogador}
                  onChange={(e) =>
                    setIdJogador(Number(e.target.value))
                  }
                >
                  <option value={0}>
                    Selecione um jogador
                  </option>

                  {dadosJogadores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={salvar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>

                <button
                  onClick={inicializar}
                  type="button"
                  className="btn btn-danger"
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