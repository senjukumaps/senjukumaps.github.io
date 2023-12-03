import React from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './Sidebar';

const App: React.FunctionComponent = (): JSX.Element => {
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
            <div id="map">
            <HexGrid width={1000} height={1000} viewBox="-75 -50 100 100">
              <GameLayout />
            </HexGrid>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Notes:</h3>
            <p>Drag and drop tokens from the left menu onto the map. Click a token to rotate it. Hover over an icon to see its type (only works on main map). </p>
            <p>This app works best in Chrome. Mobile browsers may not behave correctly and reguire you to press and hold for a long time to be able to drag.</p>
            <p>This is a fan creation for Senjutsu, a board game by Stone Sword Games. The ice background image was created by Stone Sword games. The app is intended only for non-commercial fan use. Stone Sword Games retains copyright to all of its material</p>

          </Col>
        </Row>
      </Container>
    </div>
    </React.StrictMode>
  );
}

export default App;
