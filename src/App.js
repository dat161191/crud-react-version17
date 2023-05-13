import './App.scss';
import { Header } from './component/Header';
import { ListUser } from './component/ListUser';
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <ListUser />
      </Container>

    </div>
  );
}

export default App;
