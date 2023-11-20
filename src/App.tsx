import React from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './Sidebar';

const App: React.FC = () => {
  return (
    <React.StrictMode>
    <div className="app">
      <Container fluid>
        <Row>
          <Col style={{ maxWidth: '150px' }}>
            <h2>Tokens</h2>
            <Sidebar></Sidebar>
          </Col>
          <Col className='game'>
            <h2>Map</h2>
            <HexGrid width={1000} height={1000} viewBox="-75 -50 100 100">
              <GameLayout />
            </HexGrid>
          </Col>
        </Row>
      </Container>
    </div>
    </React.StrictMode>
  );
}

export default App;
