import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL, BASE_URL2, BASE_URL5 } from '../config/axios';

function CadastrojogadoresEquipe() {
  const navigate = useNavigate();

  const { idParam, idEquipe: idEquipeParam } = useParams();

  const baseURL = `${BASE_URL5}/elenco`;

  const [id, setId] = useState('');
  const [idEquipe, setIdEquipe] = useState(0);
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [idJogador, setIdJogador] = useState(0);
  const [nomeJogador, setNomeJogador] = useState('');
  const [dados, setDados] = useState([]);

  const [dadosJogadores, setDadosJogadores] = useState(null);
  const [dadosTimes, setDadosTimes] = useState(null);

  function inicializar() {
    setId('');
    setIdEquipe(0);
    setNomeEquipe('');
    setIdJogador(0);
    setNomeJogador('');
  }

  async function salvar() {
    let data = {
      id,
      idEquipe,
      nomeEquipe,
      idJogador,
      nomeJogador,
    };

    data = JSON.stringify(data);

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso('Inscrição realizada com sucesso!');
        navigate('/listagem-equipes');
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso('Inscrição alterada com sucesso!');
        navigate('/listagem-inscricoes');
      }
    } catch (error) {
      mensagemErro(error?.response?.data || 'Erro ao salvar');
    }
  }

  async function buscar() {
    if (idParam) {
      const response = await axios.get(`${baseURL}/${idParam}`);
      const d = response.data;

      setDados(d);
      setId(d.id);
      setIdEquipe(d.idEquipe);
      setNomeEquipe(d.nomeEquipe);
      setIdJogador(d.idJogador);
      setNomeJogador(d.nomeJogador);
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/jogadores`).then((response) => {
      setDadosJogadores(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL2}/associacoesEsportivas`).then((response) => {
      setDadosTimes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [idParam]);

  useEffect(() => {
    if (idEquipeParam) {
      setIdEquipe(Number(idEquipeParam));
    }
  }, [idEquipeParam]);

  if (!dadosJogadores || !dadosTimes) return null;

  return (
    <div className="container">
      <Card title="Adicionar Jogador na Equipe">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <FormGroup label="Equipe: *" htmlFor="selectEquipe">
                <select
                  className="form-select"
                  id="selectEquipe"
                  value={idEquipe}
                  onChange={(e) => setIdEquipe(Number(e.target.value))}
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

              <FormGroup label="Jogador: *" htmlFor="selectJogador">
                <select
                  className="form-select"
                  id="selectJogador"
                  value={idJogador}
                  onChange={(e) => setIdJogador(Number(e.target.value))}
                >
                  <option value={0}></option>
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

export default CadastrojogadoresEquipe;