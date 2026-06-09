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
  const [status, setStatus] = useState('PENDENTE');

  const [dados, setDados] = useState([]);

  const [dadosTorneios, setDadosTorneios] = useState(null);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdTorneio(0);
      setStatus('PENDENTE');
    } else {
      setId(dados.id);
      setIdTorneio(dados.idTorneio);
      setStatus(dados.status);
    }
  }

  async function salvar() {
    let data = {
      id,
      idTorneio,
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
      setStatus(dados.status);
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/torneios`).then((response) => {
      setDadosTorneios(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosTorneios) return null;

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

              <FormGroup label="Status:" htmlFor="status">
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDENTE">Pendente</option>
                  <option value="AO_VIVO">Ao vivo</option>
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