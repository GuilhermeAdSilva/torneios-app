import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import api from '../config/axios';
import { BASE_URL } from '../config/axios';

function CadastroPartidas() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/partidas`;

  const [id, setId] = useState('');
  const [idTorneio, setIdTorneio] = useState(0);
  const [idEquipeMandante, setIdEquipeMandante] = useState(0);
  const [idEquipeVisitante, setIdEquipeVisitante] = useState(0);

  const [dadosTorneios, setDadosTorneios] = useState([]);
  const [dadosEquipes, setDadosEquipes] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdTorneio(0);
      setIdEquipeMandante(0);
      setIdEquipeVisitante(0);
    } else {
      buscar();
    }
  }

  async function salvar() {
    if (idTorneio === 0) {
      mensagemErro('Selecione um torneio.');
      return;
    }

    if (idEquipeMandante === 0) {
      mensagemErro('Selecione a equipe mandante.');
      return;
    }

    if (idEquipeVisitante === 0) {
      mensagemErro('Selecione a equipe visitante.');
      return;
    }

    if (idEquipeMandante === idEquipeVisitante) {
      mensagemErro(
        'A equipe mandante e visitante não podem ser iguais.'
      );
      return;
    }

    const data = {
      id,
      idTorneio,
      idEquipeMandante,
      idEquipeVisitante,
      status: 'PENDENTE'
    };

    try {
      if (idParam == null) {
        await api.post(baseURL, data);

        mensagemSucesso(
          'Partida cadastrada com sucesso!'
        );
      } else {
        await api.put(
          `${baseURL}/${idParam}`,
          data
        );

        mensagemSucesso(
          'Partida alterada com sucesso!'
        );
      }

      navigate('/listagem-partidas');
    } catch (error) {
      mensagemErro(
        error.response?.data ||
          'Erro ao salvar partida'
      );
    }
  }

  async function buscar() {
    try {
      const response = await api.get(
        `${baseURL}/${idParam}`
      );

      const partida = response.data;

      setId(partida.id);
      setIdTorneio(partida.idTorneio);
      setIdEquipeMandante(
        partida.idEquipeMandante
      );
      setIdEquipeVisitante(
        partida.idEquipeVisitante
      );
    } catch (error) {
      mensagemErro(
        'Erro ao carregar dados da partida.'
      );
    }
  }

  useEffect(() => {
    api
      .get(`${BASE_URL}/torneios`)
      .then((response) => {
        setDadosTorneios(response.data);
      })
      .catch(() => {
        mensagemErro(
          'Erro ao carregar torneios.'
        );
      });

    api
      .get(`${BASE_URL}/equipes`)
      .then((response) => {
        setDadosEquipes(response.data);
      })
      .catch(() => {
        mensagemErro(
          'Erro ao carregar equipes.'
        );
      });
  }, []);

  useEffect(() => {
    if (idParam) {
      buscar();
    }
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Partida">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <FormGroup
                label="Torneio:"
                htmlFor="selectTorneio"
              >
                <select
                  className="form-select"
                  id="selectTorneio"
                  value={idTorneio}
                  onChange={(e) =>
                    setIdTorneio(
                      Number(e.target.value)
                    )
                  }
                >
                  <option value={0}>
                    Selecione
                  </option>

                  {dadosTorneios.map(
                    (torneio) => (
                      <option
                        key={torneio.id}
                        value={torneio.id}
                      >
                        {torneio.nome}
                      </option>
                    )
                  )}
                </select>
              </FormGroup>

              <FormGroup
                label="Equipe Mandante:"
                htmlFor="selectMandante"
              >
                <select
                  className="form-select"
                  id="selectMandante"
                  value={idEquipeMandante}
                  onChange={(e) =>
                    setIdEquipeMandante(
                      Number(e.target.value)
                    )
                  }
                >
                  <option value={0}>
                    Selecione
                  </option>

                  {dadosEquipes.map(
                    (equipe) => (
                      <option
                        key={equipe.id}
                        value={equipe.id}
                      >
                        {equipe.nome}
                      </option>
                    )
                  )}
                </select>
              </FormGroup>

              <FormGroup
                label="Equipe Visitante:"
                htmlFor="selectVisitante"
              >
                <select
                  className="form-select"
                  id="selectVisitante"
                  value={idEquipeVisitante}
                  onChange={(e) =>
                    setIdEquipeVisitante(
                      Number(e.target.value)
                    )
                  }
                >
                  <option value={0}>
                    Selecione
                  </option>

                  {dadosEquipes.map(
                    (equipe) => (
                      <option
                        key={equipe.id}
                        value={equipe.id}
                      >
                        {equipe.nome}
                      </option>
                    )
                  )}
                </select>
              </FormGroup>

              <Stack
                spacing={1}
                padding={1}
                direction="row"
              >
                <button
                  onClick={salvar}
                  type="button"
                  className="btn btn-success"
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

export default CadastroPartidas;