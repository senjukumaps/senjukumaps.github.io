import React from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Tokenbar from './Tokenbar';
import Menubar from './Menubar';
import * as LZString from 'lz-string';
const log = require('loglevel');

class MainPage extends React.Component {
  gameLayoutRef = React.createRef<GameLayout>();

  saveAllTiles = () => {
    if(this.gameLayoutRef.current != null) {
      const gameState = this.gameLayoutRef.current.getGameStateAsJson();
      let compressedGameState = LZString.compressToEncodedURIComponent(gameState);
    
      log.info('saved url: ' + process.env.PUBLIC_URL + "/share/" + compressedGameState);
      log.info(gameState.length)
    }
  }
  restoreAllTiles = () => {
    if(this.gameLayoutRef.current != null) {
      const saveStateTextarea = document.getElementById('saveState') as HTMLTextAreaElement;
      if (saveStateTextarea) {
        this.gameLayoutRef.current.setGameStateFromJson(saveStateTextarea.value);
      }
      
    }
  }

  render() {
    return (
      <React.StrictMode>
      <div className="app">
        <Container fluid>
          <Row>
            <Col>
              <Tokenbar></Tokenbar>
            </Col>
          </Row>
          <Row>
            <Col className='game'>
              <HexGrid width={1000} height={1000} viewBox="-75 -50 100 100">
                <GameLayout ref={this.gameLayoutRef} />
              </HexGrid>
            </Col>
          </Row>
          <Row>
            <Col>
            <Menubar onSave={this.saveAllTiles} onRestore={this.restoreAllTiles} />
            </Col>
          </Row>
          <Row>
            <Col>
            <textarea id="saveState" rows={10} cols={100}></textarea>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Drag and drop tokens from the top menu onto the map. Drag onto an existing token to replace it, or drag a token away and back onto itself to delete it. Click an empty tile to set its color. Click a token to rotate it. Hover over an icon to see its type (only works on main map). </p>
              <p>This app works best in Chrome. Mobile browsers may not behave correctly and reguire you to press and hold for a long time to be able to drag.</p>
              <p>This is a fan creation for Senjutsu, a board game by Stone Sword Games. The ice background image was created by Stone Sword games. The app is intended only for non-commercial fan use. Stone Sword Games retains copyright to all of its material</p>

            </Col>
          </Row>
        </Container>
      </div>
      </React.StrictMode>
    );
  }
}

export default MainPage;
