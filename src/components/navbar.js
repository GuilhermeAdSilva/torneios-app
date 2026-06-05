import 'bootswatch/dist/flatly/bootstrap.css';
import './../ajustes.css'
import NavbarItem from './navbarItem';
import { HouseIcon, LogIn, LogOut } from 'lucide-react';

function Navbar(props) {
  const usuarioLogado = localStorage.getItem('usuario_logado');

  function logout() {
  localStorage.removeItem('usuario_logado');
  window.location.href = '/login';
}

  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/home' className='navbar-brand'>
           <HouseIcon />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>


          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-torneios' label='Torneios' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-associacoes-esportivas' label='Associações Esportivas' />
          </ul>

          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-arbitros' label='Árbitros' />
          </ul>

          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-jogadores' label='Jogadores' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-presidentes' label='Presidentes' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-tecnicos' label='Técnicos' />
          </ul>
          
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-equipes' label='Equipes' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/listagem-competicoes' label='Competições' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/procurar-inscricoes' label='Inscrições' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/estatisticas' label='Estatisticas' />
          </ul>
          {/* <ul className='navbar-nav'>
            <NavbarItem render='true' href='/login' label={<LogIn />} />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/' label='Sair' />
          </ul> */}
          <ul className='navbar-nav ms-auto'>
            {!usuarioLogado && (
              <NavbarItem
                render='true'
                href='/login'
                label={<LogIn />}
                
              />
            )}

            {usuarioLogado && (
              <li className='nav-item'>
                <button className='botao-logout'
                  onClick={logout}
                >
                  <LogOut />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
