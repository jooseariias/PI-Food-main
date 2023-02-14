import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CardDetails from './components/CardsDetais/CardDetails';
import CreateRecipe from './components/fomulario/Form';
import Inicio from './components/inicio/Inicio';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Inicio} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/recipe/:id' component={CardDetails} />
      <Route exact path='/create' component={CreateRecipe} />
    </div>
  );
}

export default App;
