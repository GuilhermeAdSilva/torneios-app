import './App.css';
import Navbar from './components/navbar';
import Rotas from './rotas';
import './bootstrap.css'
import 'bootswatch/dist/flatly/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import './ajustes.css'


function App() {
  return (
    <div className="App">
      <Rotas />
      <Navbar />
    </div>
  );
}

export default App;
