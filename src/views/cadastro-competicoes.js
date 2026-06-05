import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroCompeticoes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/edicoesTorneios`;

  const [id, setId] = useState("");
  const [nomeEdicao, setNomeEdicao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [premiacao, setPremiacao] = useState("");
  const [returno, setReturno] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [idTorneio, setTorneio] = useState("");
  const [quantidadeEquipes, setQuantidadeEquipes] = useState("");
  const [dados, setDados] = React.useState([]);


  function inicializar() {
    if (idParam == null) {
      setId("");
      setNomeEdicao("");
      setDataInicio("");
      setDataFim("");
      setPremiacao("");
      setReturno("");
      setModalidade("");
      setTorneio("");
      setQuantidadeEquipes("");
    } else {
      setId(dados.id);
      setNomeEdicao(dados.nomeEdicao);
      setDataInicio(dados.dataInicio);
      setDataFim(dados.dataFim);
      setPremiacao(dados.premiacao);
      setReturno(dados.returno);
      setModalidade(dados.modalidade);
      setTorneio(dados.idTorneio);
      setQuantidadeEquipes(dados.quantidadeEquipes);
    }
  }

  async function salvar() {
    let data = {
      id,
      nomeEdicao,
      dataInicio,
      dataFim,
      premiacao,
      returno,
      modalidade,
      idTorneio,
      quantidadeEquipes,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Competição ${nomeEdicao} cadastrada com sucesso!`);
          navigate(`/listagem-competicoes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Competição ${nomeEdicao} alterada com sucesso!`);
          navigate(`/listagem-competicoes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNomeEdicao(dados.nomeEdicao);
      setDataInicio(dados.dataInicio);
      setDataFim(dados.dataFim);
      setPremiacao(dados.premiacao);
      setReturno(dados.returno);
      setModalidade(dados.modalidade);
      setTorneio(dados.idTorneio);
      setQuantidadeEquipes(dados.quantidadeEquipes)
    }
  }

  const [dadosTorneio, setDadosTorneio] = React.useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL2}/torneios`).then((response) => {
      setDadosTorneio(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Competição">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome da Edição: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  value={nomeEdicao}
                  className="form-control"
                  name="nomeEdicao"
                  onChange={(e) => setNomeEdicao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Data de Início: *" htmlFor="inputDataInicio">
                <input
                  type="date"
                  id="inputDataInicio"
                  value={dataInicio}
                  className="form-control"
                  name="dataInicio"
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Data de Fim: *" htmlFor="inputDataFim">
                <input
                  type="date"
                  id="inputDataFim"
                  value={dataFim}
                  className="form-control"
                  name="dataFim"
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Premiação: " htmlFor="inputPremiacao">
                <input
                  type="text"
                  id="inputPremiacao"
                  value={premiacao}
                  className="form-control"
                  name="premiacao"
                  onChange={(e) => setPremiacao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Returno: *" htmlFor="inputReturno">
                <div className="aura">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="checkReturnoSim"
                    name="returno"
                    value="1"
                    checked={returno === "1"}
                    onChange={(e) => setReturno(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="checkReturnoSim">
                    Sim
                  </label>

                  <input
                    className="form-check-input"
                    type="radio"
                    id="checkReturnoNao"
                    name="returno"
                    value="0"
                    checked={returno === "0"}
                    onChange={(e) => setReturno(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="checkReturnoNao">
                    Nao
                  </label>
                </div>
              </FormGroup>

              <FormGroup label="Modalidade: *" htmlFor="inputModalidade">
                <div className="aura">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="checkModalidadeM"
                    name="modalidade"
                    value="M"
                    checked={modalidade === "M"}
                    onChange={(e) => setModalidade(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="checkModalidade">
                    Masculino
                  </label>

                  <input
                    className="form-check-input"
                    type="radio"
                    id="checkModalidadeF"
                    name="modalidade"
                    value="F"
                    checked={modalidade === "F"}
                    onChange={(e) => setModalidade(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="checkModalidade">
                    Feminino
                  </label>
                </div>
              </FormGroup>

              <FormGroup label="Torneio: *" htmlFor="selectTorneio">
                <select
                  className="form-select"
                  id="selectTorneio"
                  name="idTorneio"
                  value={idTorneio}
                  onChange={(e) => setTorneio(e.target.value)}
                >
                  <option key="0" value="0">
                    {" "}
                  </option>
                  {dadosTorneio.map((dado) => (
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

export default CadastroCompeticoes;
