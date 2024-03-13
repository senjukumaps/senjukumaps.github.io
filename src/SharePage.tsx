import React, { useRef } from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import './App.css';
import * as LZString from 'lz-string';
import Menubar from './Menubar';

const log = require('loglevel');

const SharePage = () => {
  const gameLayoutRef = useRef<GameLayout>(null);
  
  const saveAllTiles = () => {
    if(gameLayoutRef.current != null) {
      const gameState = gameLayoutRef.current.getGameStateAsJson();
      log.info('Saving game state:', gameState);
      log.info(gameState.length)
    }
  }
  const restoreAllTiles = (id: string) => {
    if(gameLayoutRef.current != null && id) {
      const decompressedGameStateJson = LZString.decompressFromEncodedURIComponent(id);
      //const gameState = JSON.parse(decompressedGameStateJson);
      gameLayoutRef.current.setGameStateFromJson(decompressedGameStateJson);
    }
    else {
      log.error('restoreAllTiles gameLayoutRef.current is null or id is null', id, gameLayoutRef.current);
    }
  }

  const { id } = useParams();
  if(id) {
    restoreAllTiles(id);
  }

  log.info('SharePage id:', id);
  return (
    <React.StrictMode>
      <div className="app">
        <Container fluid>
          <Row>
            <Col className='game'>
              <HexGrid width={1000} height={1000} viewBox="-75 -50 100 100">
                <GameLayout ref={gameLayoutRef} allowEditing={false}/>
              </HexGrid>
            </Col>
          </Row>
          <Row>
            <Col>
            <Menubar onSave={saveAllTiles} onRestore={restoreAllTiles} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.StrictMode>
  );
}

export default SharePage;
