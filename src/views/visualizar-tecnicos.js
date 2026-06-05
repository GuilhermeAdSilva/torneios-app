import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function VisualizarTecnicos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/tecnicos`;

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNome("");
      setSexo("");
      setEmail("");
      setTelefone("");
      setSenha("");
      setConfirmacaoSenha("");
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setSexo(dados.sexo);
      setEmail(dados.email);
      setTelefone(dados.telefone);
      setSenha(dados.senha);
      setConfirmacaoSenha(dados.confirmacaoSenha);
    }
  }

  async function salvar() {
    let data = { id, nome, sexo, email, telefone, senha, confirmacaoSenha };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Técnico ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-tecnicos`);
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
          mensagemSucesso(`Técnico ${nome} alterado com sucesso!`);
          navigate(`/listagem-tecnicos`);
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
      setNome(dados.nome);
      setSexo(dados.sexo);
      setEmail(dados.email);
      setTelefone(dados.telefone);
      setSenha(dados.senha);
      setConfirmacaoSenha(dados.confirmacaoSenha);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Dados do Técnico">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  value={nome}
                  className="form-control"
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                  disabled
                />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  value={email}
                  className="form-control"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </FormGroup>

              <FormGroup label="Telefone:" htmlFor="inputTelefone">
                <input
                  type="text"
                  id="inputTelefone"
                  value={telefone}
                  className="form-control"
                  name="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                  disabled
                />
              </FormGroup>

              <FormGroup label="Sexo: *" htmlFor="inputSexo">
                <div className="aura">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="checkSexoF"
                    name="sexo"
                    value="F"
                    checked={sexo === "F"}
                    onChange={(e) => setSexo(e.target.value)}
                    disabled
                  />
                  <label className="form-check-label" htmlFor="checkSexoF">
                    Feminino
                  </label>

                  <input
                    className="form-check-input"
                    type="radio"
                    id="checkSexoM"
                    name="sexo"
                    value="M"
                    checked={sexo === "M"}
                    onChange={(e) => setSexo(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="checkSexoM">
                    Masculino
                  </label>
                </div>
              </FormGroup>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default VisualizarTecnicos;
