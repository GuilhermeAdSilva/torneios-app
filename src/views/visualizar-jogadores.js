import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";

import api from '../config/axios';
import { BASE_URL } from "../config/axios";

function VisualizarJogadores() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/jogadores`;

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmacaoSenha("");
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setEmail(dados.email);
      setSenha(dados.senha);
      setConfirmacaoSenha(dados.confirmacaoSenha);
    }
  }


  async function buscar() {
    if (idParam != null) {
      await api.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setEmail(dados.email);
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
      <Card title="Dados do Jogador">
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
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default VisualizarJogadores;
