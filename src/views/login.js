import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

// 1. ATENÇÃO AQUI: Verifique se a sua pasta "services" está realmente em "src/services"
// Se não funcionar, tente mudar para: import api from './services/api'; (caso esteja dentro de views)
import api from '../config/axios'; 

import '../custom.css';

class Login extends React.Component {
  state = {
    login: '',
    senha: '',
  };

  // Código da função 'logar' corrigido dentro da estrutura da classe
  logar = async () => {
    if (!this.state.login || !this.state.senha) {
      mensagemErro('Por favor, preencha o login e a senha.');
      return;
    }

    try {
      // Usando 'api.post' em vez de 'axios.post' para usar a nossa configuração com o Bearer Token
      const resposta = await api.post('/usuarios/auth', {
        login: this.state.login,
        senha: this.state.senha
      });

      const { token, login, admin } = resposta.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario_logado', login);
      localStorage.setItem('is_admin', JSON.stringify(admin));

      mensagemSucesso(`Usuário ${login} autenticado com sucesso!`);

      window.location.href = '/home';

    } catch (error) {
      console.error("Erro ao autenticar:", error);
      
      if (error.response && error.response.status === 401) {
        mensagemErro('Login ou senha incorretos.');
      } else {
        mensagemErro('Erro ao tentar se comunicar com o servidor.');
      }
    }
  };

  cancelar = () => {
    this.setState({
      login: '',
      senha: '',
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='col-lg-7'>
          <Card title='Acesso'>
            <div className='row'>
              <div className='bs-component'>
                <FormGroup label='Login: *' htmlFor='inputLogin'>
                  <input
                    type='text'
                    id='inputLogin'
                    value={this.state.login}
                    className='form-control'
                    name='login'
                    onChange={(e) => this.setState({ login: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label='Senha: *' htmlFor='inputSenha'>
                  <input
                    type='password'
                    id='inputSenha'
                    value={this.state.senha}
                    className='form-control'
                    name='senha'
                    onChange={(e) => this.setState({ senha: e.target.value })}
                  />
                </FormGroup>
                <Stack spacing={1} padding={1} direction='row'>
                  <button
                    onClick={this.logar}
                    type='button'
                    className='btn btn-success'
                  >
                    Entrar
                  </button>
                  <button
                    onClick={this.cancelar}
                    type='button'
                    className='btn btn-danger'
                  >
                    Cancelar
                  </button>
                </Stack>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;