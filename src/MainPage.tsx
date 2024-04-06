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

  shareTiles = () => {
    if(this.gameLayoutRef.current != null) {
      const gameState = this.gameLayoutRef.current.getGameStateAsJson();
      let compressedGameState = LZString.compressToEncodedURIComponent(gameState);
    
      let link = location.origin + "/share/v1/" + compressedGameState;
      log.info('saved url: ' + link);
      log.info(gameState.length);
      navigator.clipboard.writeText(link);
      // open link in new tab
      window.open(link, '_blank');
    }
  }
  saveTiles = () => {
    // unused
    if(this.gameLayoutRef.current != null) {
      const gameState = this.gameLayoutRef.current.getGameStateAsJson();
      let compressedGameState = LZString.compressToEncodedURIComponent(gameState);
      const saveStateTextarea = document.getElementById('saveState') as HTMLTextAreaElement;
      if (saveStateTextarea) {
        saveStateTextarea.value = gameState;
      }
      
    }
  }
  restoreTiles = () => {
    // unused
    if(this.gameLayoutRef.current != null) {
      const saveStateTextarea = document.getElementById('saveState') as HTMLTextAreaElement;
      if (saveStateTextarea) {
        this.gameLayoutRef.current.setGameStateFromJson(saveStateTextarea.value);
      }
      
    }
  }
  resetTiles = () => {
    if(this.gameLayoutRef.current != null) {
      this.gameLayoutRef.current.resetGameState();
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
                <GameLayout ref={this.gameLayoutRef} allowEditing={true}/>
              </HexGrid>
            </Col>
          </Row>
          <Row>
            <Col>
            <Menubar onShare={this.shareTiles} onSave={this.saveTiles} onRestore={this.restoreTiles} onClear={this.resetTiles} />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Drag and drop tokens from the top menu onto the map. Drag onto an existing token to replace it, or drag a token away and back onto itself to delete it. Click an empty tile to set its color. Click a token to rotate it. Hover over an icon to see its type (only works on main map). </p>
              <p>The Share button will open a new window with a read-only view of your map. It will also copy a link to your clipboard to share.</p>
              <p>This app works best in Chrome. Mobile browsers may not behave correctly and reguire you to press and hold for a long time to be able to drag.</p>
              <p>This is a fan creation for Senjutsu, a board game by Stone Sword Games. The character icons and ice background image were created by Stone Sword games. The app is intended only for non-commercial fan use. Stone Sword Games retains copyright to all of its material. The character icons in the bottom row are by 'Hey Rabbit' and are licensed from <a href="https://thenounproject.com/creator/heyrabbit/">The Noun Project</a>.</p>

            </Col>
          </Row>
        </Container>
      </div>
      </React.StrictMode>
    );
  }
}

export default MainPage;
