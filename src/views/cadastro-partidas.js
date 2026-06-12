import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroPartidas() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/partidas`;

  const [id, setId] = useState('');
  const [idTorneio, setIdTorneio] = useState(0);
  const [idEquipeMandante, setIdEquipeMandante] = useState(0);
  const [golsEquipeMandante, setGolsEquipeMandante] = useState(0);
  const [idEquipeVisitante, setIdEquipeVisitante] = useState(0);
  const [golsEquipeVisitante, setGolsEquipeVisitante] = useState(0);
  const [prorrogracao, setProrrogracao] = useState(false);
  const [penaltis, setPenaltis] = useState(false);
  const [penaltisMandante, setPenaltisMandante] = useState(0);
  const [penaltisVisitante, setPenaltisVisitante] = useState(0);
  const [status, setStatus] = useState('PENDENTE');
  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdTorneio(0);
      setIdEquipeMandante(0);
      setGolsEquipeMandante(0);
      setIdEquipeVisitante(0);
      setGolsEquipeVisitante(0);
      setProrrogracao(null);
      setPenaltis(null);
      setPenaltisMandante(null);
      setPenaltisVisitante(null);
      setStatus('PENDENTE');
    } else {
      setId(dados.id);
      setIdTorneio(dados.idTorneio);
      setIdEquipeMandante(dados.idEquipeMandante);
      setGolsEquipeMandante(dados.golsEquipeMandante);
      setIdEquipeVisitante(dados.idEquipeVisitante);
      setGolsEquipeVisitante(dados.golsEquipeVisitante);
      setProrrogracao(dados.prorrogracao);
      setPenaltis(dados.penaltis);
      setPenaltisMandante(dados.penaltisMandante);
      setPenaltisVisitante(dados.penaltisVisitante);
      setStatus(dados.status);
    }
  }

  async function salvar() {
    let data = {
      id,
      idTorneio,
      idEquipeMandante,
      golsEquipeMandante,
      idEquipeVisitante,
      golsEquipeVisitante,
      prorrogracao,
      penaltis,
      penaltisMandante,
      penaltisVisitante,
      status,
    };

    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso('Partida cadastrada com sucesso!');
          navigate('/listagem-partidas');
        })
        .catch(function (error) {
          mensagemErro(error.response?.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso('Partida alterada com sucesso!');
          navigate('/listagem-partidas');
        })
        .catch(function (error) {
          mensagemErro(error.response?.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });

      setId(dados.id);
      setIdTorneio(dados.idTorneio);
      setIdEquipeMandante(dados.idEquipeMandante);
      setGolsEquipeMandante(dados.golsEquipeMandante);
      setIdEquipeVisitante(dados.idEquipeVisitante);
      setGolsEquipeVisitante(dados.golsEquipeVisitante);
      setProrrogracao(dados.prorrogracao);
      setPenaltis(dados.penaltis);
      setPenaltisMandante(dados.penaltisMandante);
      setPenaltisVisitante(dados.penaltisVisitante);
      setStatus(dados.status);
    }
  }

  const [dadosEquipes, setDadosEquipes] = React.useState(null);
  const [dadosTorneios, setDadosTorneios] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/torneios`).then((response) => {
      setDadosTorneios(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/equipes`).then((response) => {
      setDadosEquipes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosTorneios) return null;
  if (!dadosEquipes) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Partida">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <FormGroup label="Torneio:" htmlFor="selectTorneio">
                <select
                  className="form-select"
                  value={idTorneio}
                  onChange={(e) =>
                    setIdTorneio(Number(e.target.value))
                  }
                >
                  <option value={0}>Selecione</option>

                  {dadosTorneios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Equipe Mandante:" htmlFor="mandante">
                <select
                  className="form-select"
                  value={idEquipeMandante}
                  onChange={(e) =>
                    setIdEquipeMandante(Number(e.target.value))
                  }
                >
                  <option value={0}>Selecione</option>

                  {dadosEquipes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Gols Mandante:" htmlFor="golsMandante">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={golsEquipeMandante}
                  onChange={(e) =>
                    setGolsEquipeMandante(Number(e.target.value))
                  }
                />
              </FormGroup>

              <FormGroup label="Equipe Visitante:" htmlFor="visitante">
                <select
                  className="form-select"
                  value={idEquipeVisitante}
                  onChange={(e) =>
                    setIdEquipeVisitante(Number(e.target.value))
                  }
                >
                  <option value={0}>Selecione</option>

                  {dadosEquipes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Gols Visitante:" htmlFor="golsVisitante">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={golsEquipeVisitante}
                  onChange={(e) =>
                    setGolsEquipeVisitante(Number(e.target.value))
                  }
                />
              </FormGroup>

              <FormGroup label="Prorrogação:" htmlFor="prorrogacao">
                <select
                  className="form-select"
                  value={prorrogracao}
                  onChange={(e) =>
                    setProrrogracao(e.target.value === 'true')
                  }
                >
                  <option value={false}>Não</option>
                  <option value={true}>Sim</option>
                </select>
              </FormGroup>

              <FormGroup label="Pênaltis:" htmlFor="penaltis">
                <select
                  className="form-select"
                  value={penaltis}
                  onChange={(e) =>
                    setPenaltis(e.target.value === 'true')
                  }
                >
                  <option value={false}>Não</option>
                  <option value={true}>Sim</option>
                </select>
              </FormGroup>

              {penaltis && (
                <>
                  <FormGroup
                    label="Pênaltis Mandante:"
                    htmlFor="penMandante"
                  >
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      value={penaltisMandante}
                      onChange={(e) =>
                        setPenaltisMandante(
                          Number(e.target.value)
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
                      min="0"
                      className="form-control"
                      value={penaltisVisitante}
                      onChange={(e) =>
                        setPenaltisVisitante(
                          Number(e.target.value)
                        )
                      }
                    />
                  </FormGroup>
                </>
              )}

              <FormGroup label="Status:" htmlFor="status">
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDENTE">Pendente</option>
                  <option value="AO_VIVO">Ao Vivo</option>
                  <option value="FINALIZADA">Finalizada</option>
                  <option value="CANCELADA">Cancelada</option>
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

export default CadastroPartidas;