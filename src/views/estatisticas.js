import Card from '../components/card';

import '../custom.css';
import '../ajustes.css'

function Estatisticas() {
    return (
        <div className='container'>
            <Card title='Estatísticas'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Artilheiros</th>
                                        <th scope='col'>Garçons</th>
                                        <th scope='col'>Cartões Amarelos</th>
                                        <th scope='col'>Cartões Vermelhos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                            <td><a className='emoji-est' href="/listagem-gols">&#9917;</a></td>
                                            <td><a className='emoji-est' href="/listagem-assistencias">&#129497;</a></td>
                                            <td><a className='emoji-est' href="/listagem-cartoes-amarelos">&#129000;</a></td>
                                            <td><a className='emoji-est' href="/listagem-cartoes-vermelhos">&#128997;</a></td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Estatisticas;
