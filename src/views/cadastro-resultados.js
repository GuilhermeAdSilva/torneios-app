import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroResultados() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/resultados`;

  const [id, setId] = useState('');

  const [idEquipeMandante, setIdEquipeMandante] = useState(0);
  const [nomeEquipeMandante, setNomeEquipeMandante] = useState('');

  const [idEquipeVisitante, setIdEquipeVisitante] = useState(0);
  const [nomeEquipeVisitante, setNomeEquipeVisitante] = useState('');

  const [golsMandante, setGolsMandante] = useState(0);
  const [golsVisitante, setGolsVisitante] = useState(0);

  const [prorrogacao, setProrrogacao] = useState(false);
  const [penaltis, setPenaltis] = useState(false);

  const [penaltisMandante, setPenaltisMandante] = useState('');
  const [penaltisVisitante, setPenaltisVisitante] = useState('');

  const [dadosTimes, setDadosTimes] = useState([]);
  const [dados, setDados] = useState(null);

  function inicializar() {
    setId('');
    setIdEquipeMandante(0);
    setNomeEquipeMandante('');
    setIdEquipeVisitante(0);
    setNomeEquipeVisitante('');
    setGolsMandante(0);
    setGolsVisitante(0);
    setProrrogacao(false);
    setPenaltis(false);
    setPenaltisMandante('');
    setPenaltisVisitante('');
  }

  async function salvar() {
    try {
      const mandante = dadosTimes.find(
        (e) => e.id === Number(idEquipeMandante)
      );

      const visitante = dadosTimes.find(
        (e) => e.id === Number(idEquipeVisitante)
      );

      const data = {
        id,
        idEquipeMandante: Number(idEquipeMandante),
        nomeEquipeMandante: mandante?.nome || '',
        golsMandante: Number(golsMandante),

        idEquipeVisitante: Number(idEquipeVisitante),
        nomeEquipeVisitante: visitante?.nome || '',
        golsVisitante: Number(golsVisitante),

        prorrogacao,
        penaltis,

        penaltisMandante:
          penaltis && penaltisMandante !== ''
            ? Number(penaltisMandante)
            : null,

        penaltisVisitante:
          penaltis && penaltisVisitante !== ''
            ? Number(penaltisVisitante)
            : null,
      };

      if (!idParam) {
        await axios.post(baseURL, data);

        mensagemSucesso('Resultado cadastrado com sucesso!');
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);

        mensagemSucesso('Resultado alterado com sucesso!');
      }

      navigate('/listagem-resultados');
    } catch (error) {
      mensagemErro(
        error?.response?.data || 'Erro ao salvar resultado'
      );
    }
  }

  async function buscar() {
    if (!idParam) return;

    try {
      const response = await axios.get(
        `${baseURL}/${idParam}`
      );

      const d = response.data;

      setDados(d);

      setId(d.id);

      setIdEquipeMandante(d.idEquipeMandante);
      setNomeEquipeMandante(d.nomeEquipeMandante);

      setIdEquipeVisitante(d.idEquipeVisitante);
      setNomeEquipeVisitante(d.nomeEquipeVisitante);

      setGolsMandante(d.golsMandante);
      setGolsVisitante(d.golsVisitante);

      setProrrogacao(d.prorrogacao);
      setPenaltis(d.penaltis);

      setPenaltisMandante(d.penaltisMandante ?? '');
      setPenaltisVisitante(d.penaltisVisitante ?? '');
    } catch {
      mensagemErro('Erro ao carregar resultado');
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/equipes`).then((response) => {
      setDadosTimes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Resultado">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <FormGroup
                label="Equipe Mandante:"
                htmlFor="selectMandante"
              >
                <select
                  id="selectMandante"
                  className="form-select"
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

                  {dadosTimes.map((time) => (
                    <option
                      key={time.id}
                      value={time.id}
                    >
                      {time.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup
                label="Gols Mandante:"
                htmlFor="golsMandante"
              >
                <input
                  type="number"
                  id="golsMandante"
                  className="form-control"
                  value={golsMandante}
                  onChange={(e) =>
                    setGolsMandante(e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup
                label="Equipe Visitante:"
                htmlFor="selectVisitante"
              >
                <select
                  id="selectVisitante"
                  className="form-select"
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

                  {dadosTimes.map((time) => (
                    <option
                      key={time.id}
                      value={time.id}
                    >
                      {time.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup
                label="Gols Visitante:"
                htmlFor="golsVisitante"
              >
                <input
                  type="number"
                  id="golsVisitante"
                  className="form-control"
                  value={golsVisitante}
                  onChange={(e) =>
                    setGolsVisitante(e.target.value)
                  }
                />
              </FormGroup>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="prorrogacao"
                  checked={prorrogacao}
                  onChange={(e) =>
                    setProrrogacao(e.target.checked)
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="prorrogacao"
                >
                  Houve prorrogação
                </label>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="penaltis"
                  checked={penaltis}
                  onChange={(e) =>
                    setPenaltis(e.target.checked)
                  }
                />

                <label
                  className="form-check-label"
                  htmlFor="penaltis"
                >
                  Decidido nos pênaltis
                </label>
              </div>

              {penaltis && (
                <>
                  <FormGroup
                    label="Pênaltis Mandante:"
                    htmlFor="penMandante"
                  >
                    <input
                      type="number"
                      id="penMandante"
                      className="form-control"
                      value={penaltisMandante}
                      onChange={(e) =>
                        setPenaltisMandante(
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>

                  <FormGroup
                    label="Pênaltis Visitante:"
                    htmlFor="penVisitante"
                  >
                    <input
                      type="number"
                      id="penVisitante"
                      className="form-control"
                      value={penaltisVisitante}
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
                  type="button"
                  className="btn btn-danger"
                >
                  Limpar
                </button>
              </Stack>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroResultados;