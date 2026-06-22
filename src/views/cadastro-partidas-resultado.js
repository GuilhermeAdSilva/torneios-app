import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import api from '../config/axios';
import { BASE_URL } from '../config/axios';

function CadastroPartidasResultado() {
  const { idPartida } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/partidas`;

  const [id, setId] = useState('');
  const [idTorneio, setIdTorneio] = useState(null);

  const [idEquipeMandante, setIdEquipeMandante] =
    useState(null);
  const [nomeEquipeMandante, setNomeEquipeMandante] =
    useState("");

  const [idEquipeVisitante, setIdEquipeVisitante] =
    useState(null);
  const [nomeEquipeVisitante, setNomeEquipeVisitante] =
    useState("");

  const [golsMandante, setGolsMandante] = useState(0);
  const [golsVisitante, setGolsVisitante] = useState(0);

  const [prorrogacao, setProrrogacao] = useState(false);
  const [penaltis, setPenaltis] = useState(false);
  const [penaltisMandante, setPenaltisMandante] =
    useState(0);
  const [penaltisVisitante, setPenaltisVisitante] =
    useState(0);

  async function buscar() {
    try {
      const response = await api.get(`${baseURL}/${idPartida}`);

      console.log(response.data);

      const partida = response.data;

      setNomeEquipeMandante(partida.nomeEquipeMandante);
      setNomeEquipeVisitante(partida.nomeEquipeVisitante);

    } catch (error) {
      mensagemErro('Erro ao carregar dados da partida.');
    }

    try {
      const response = await api.get(
        `${baseURL}/${idPartida}`
      );

      const partida = response.data;

      setId(partida.id);
      setIdTorneio(partida.idTorneio);

      setIdEquipeMandante(
        partida.idEquipeMandante
      );
      setNomeEquipeMandante(
        partida.nomeEquipeMandante
      );

      setIdEquipeVisitante(
        partida.idEquipeVisitante
      );
      setNomeEquipeVisitante(
        partida.nomeEquipeVisitante
      );

      setGolsMandante(
        partida.golsMandante ?? 0
      );
      setGolsVisitante(
        partida.golsVisitante ?? 0
      );

      setProrrogacao(
        partida.prorrogacao ?? false
      );

      setPenaltis(
        partida.penaltis ?? false
      );

      setPenaltisMandante(
        partida.penaltisMandante ?? 0
      );

      setPenaltisVisitante(
        partida.penaltisVisitante ?? 0
      );
    } catch (error) {
      mensagemErro(
        'Erro ao carregar dados da partida.'
      );
    }
  }

  async function salvar() {
    if (
      prorrogacao &&
      Number(golsMandante) !=
      Number(golsVisitante)
    ) {
      mensagemErro(
        'Resultado inválido para prorrogação.'
      );
      return;
    }

    if (
      Number(penaltisMandante) < 0 ||
      Number(penaltisVisitante) < 0
    ) {
      mensagemErro(
        'Resultado inválido para penaltis.'
      );
      return;
    }

    if (
      Number(penaltisMandante) -
      Number(penaltisVisitante) > 2 ||
      Number(penaltisVisitante) -
      Number(penaltisMandante) > 2
    ) {
      mensagemErro(
        'Resultado inválido para penaltis.'
      );
      return;
    }

    if (
      penaltis &&
      Number(golsMandante) !=
      Number(golsVisitante)
    ) {
      mensagemErro(
        'Resultado inválido para penaltis.'
      );
      return;
    }

    if (
      penaltis &&
      Number(penaltisMandante) ===
      Number(penaltisVisitante)
    ) {
      mensagemErro(
        'Nos pênaltis deve existir um vencedor.'
      );
      return;
    }

    const data = {
      id,
      idTorneio,

      idEquipeMandante,
      golsMandante: Number(golsMandante),

      idEquipeVisitante,
      golsVisitante: Number(golsVisitante),

      prorrogacao,
      penaltis,

      penaltisMandante: Number(
        penaltisMandante
      ),

      penaltisVisitante: Number(
        penaltisVisitante
      ),

      status: 'AO_VIVO'
    };

    try {
      await api.put(
        `${baseURL}/${idPartida}`,
        data
      );

      mensagemSucesso(
        'Resultado registrado com sucesso!'
      );

    } catch (error) {
      mensagemErro(
        error.response?.data ||
        'Erro ao salvar resultado.'
      );
    }
  }

  async function finalizar() {
    if (
      prorrogacao &&
      Number(golsMandante) !=
      Number(golsVisitante)
    ) {
      mensagemErro(
        'Resultado inválido para prorrogação.'
      );
      return;
    }

    if (
      penaltis &&
      Number(golsMandante) !=
      Number(golsVisitante)
    ) {
      mensagemErro(
        'Resultado inválido para penaltis.'
      );
      return;
    }

    if (
      penaltis &&
      Number(penaltisMandante) ===
      Number(penaltisVisitante)
    ) {
      mensagemErro(
        'Nos pênaltis deve existir um vencedor.'
      );
      return;
    }

    const data = {
      id,
      idTorneio,

      idEquipeMandante,
      golsMandante: Number(golsMandante),

      idEquipeVisitante,
      golsVisitante: Number(golsVisitante),

      prorrogacao,
      penaltis,

      penaltisMandante: Number(
        penaltisMandante
      ),

      penaltisVisitante: Number(
        penaltisVisitante
      ),

      status: 'FINALIZADA'
    };

    try {
      await api.put(
        `${baseURL}/${idPartida}`,
        data
      );

      mensagemSucesso(
        'Resultado registrado com sucesso!'
      );

      navigate('/listagem-partidas');
    } catch (error) {
      mensagemErro(
        error.response?.data ||
        'Erro ao salvar resultado.'
      );
    }
  }

  useEffect(() => {
    if (idPartida) {
      buscar();
    }
  }, [idPartida]);

  return (
    <div className='container'>
      <Card title='Resultado da Partida'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup
                label={`Gols do time ${nomeEquipeMandante}: *`}
                htmlFor='inputGolsMandante'
              >
                <input
                  type='number'
                  min='0'
                  id='inputGolsMandante'
                  value={golsMandante}
                  className='form-control'
                  onChange={(e) =>
                    setGolsMandante(
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup
                label={`Gols do time ${nomeEquipeVisitante}: *`}
                htmlFor='inputGolsVisitante'
              >
                <input
                  type='number'
                  min='0'
                  id='inputGolsVisitante'
                  value={golsVisitante}
                  className='form-control'
                  onChange={(e) =>
                    setGolsVisitante(
                      e.target.value
                    )
                  }
                />
              </FormGroup>

              <FormGroup
                label='Houve prorrogação?'
                htmlFor='inputProrrogacao'
              >
                <div className='form-check'>
                  <input
                    type='checkbox'
                    id='inputProrrogacao'
                    className='form-check-input'
                    checked={prorrogacao}
                    onChange={(e) =>
                      setProrrogacao(e.target.checked)
                    }
                  />

                  <label
                    className='form-check-label'
                    htmlFor='inputProrrogacao'
                  >
                    Sim
                  </label>
                </div>
              </FormGroup>

              <FormGroup
                label='Partida decidida nos pênaltis?'
                htmlFor='inputPenaltis'
              >
                <div className='form-check'>
                  <input
                    type='checkbox'
                    id='inputPenaltis'
                    className='form-check-input'
                    checked={penaltis}
                    onChange={(e) =>
                      setPenaltis(e.target.checked)
                    }
                  />

                  <label
                    className='form-check-label'
                    htmlFor='inputPenaltis'
                  >
                    Sim
                  </label>
                </div>
              </FormGroup>

              {penaltis && (
                <>
                  <FormGroup
                    label={`Pênaltis do time ${nomeEquipeMandante}:`}
                    htmlFor='inputPenaltisMandante'
                  >
                    <input
                      type='number'
                      min='0'
                      id='inputPenaltisMandante'
                      value={penaltisMandante}
                      className='form-control'
                      onChange={(e) =>
                        setPenaltisMandante(
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>

                  <FormGroup
                    label={`Pênaltis do time ${nomeEquipeVisitante}:`}
                    htmlFor='inputPenaltisVisitante'
                  >
                    <input
                      type='number'
                      min='0'
                      id='inputPenaltisVisitante'
                      value={penaltisVisitante}
                      className='form-control'
                      onChange={(e) =>
                        setPenaltisVisitante(
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>
                </>
              )}

              <Stack
                spacing={1}
                padding={1}
                direction='row'
              >
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-info'
                >
                  Novo evento
                </button>

                <button
                  onClick={() =>
                    navigate(
                      '/listagem-partidas'
                    )
                  }
                  type='button'
                  className='btn btn-danger'
                >
                  Voltar
                </button>
              </Stack>

              <button
                  onClick={finalizar}
                  type='button'
                  className='btn btn-success'
                >
                  Finalizar Partida
                </button>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroPartidasResultado;
