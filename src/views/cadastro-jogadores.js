import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";

import api from '../config/axios';
import { BASE_URL } from "../config/axios";

function CadastroJogadores() {
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

  async function salvar() {
    if (senha != confirmacaoSenha) {
      mensagemErro(
              'Confirmação de senha inválida!'
            );
            return;
    }

    if (senha.length < 8) {
      mensagemErro(
              'A senha deve ter pelo menos 8 caractéres'
            );
            return;
    }


    let data = { id, nome, email, senha, confirmacaoSenha };
    data = JSON.stringify(data);
    if (idParam == null) {
      await api
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Jogador ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-jogadores`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await api
        .put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Jogador ${nome} alterado com sucesso!`);
          navigate(`/listagem-jogadores`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
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
      <Card title="Cadastro de Jogador">
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
                />
              </FormGroup>

              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  value={senha}
                  className="form-control"
                  name="senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                label="Confirmação Senha: *"
                htmlFor="inputConfirmacaoSenha"
              >
                <input
                  type="password"
                  id="inputConfirmacaoSenha"
                  value={confirmacaoSenha}
                  className="form-control"
                  name="confirmacaoSenha"
                  onChange={(e) => setConfirmacaoSenha(e.target.value)}
                />
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

export default CadastroJogadores;
