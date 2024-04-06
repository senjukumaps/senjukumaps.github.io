import React from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import * as LZString from 'lz-string';
import Menubar from './Menubar';

const log = require('loglevel');

class SharePage extends React.Component {
  gameLayoutRef = React.createRef<GameLayout>();

  constructor(props: any) {
    super(props);
    this.restoreTiles = this.restoreTiles.bind(this);
  }

  restoreTiles(id: string) {
    if(this.gameLayoutRef.current != null && id) {
      const decompressedGameStateJson = LZString.decompressFromEncodedURIComponent(id);
      log.info('restored JSON:', decompressedGameStateJson);
      this.gameLayoutRef.current.setGameStateFromJson(decompressedGameStateJson);
    }
    else {
      log.error('restoreTiles gameLayoutRef.current is null or id is null', id, this.gameLayoutRef.current);
    }
  }

  componentDidMount() {
    let savedState = location.pathname.replace('/share/v1/', '')
    log.info('SharePage loading: ', savedState);
    this.restoreTiles(savedState);
  }

  render() {
    return (
      <React.StrictMode>
        <div className="app">
          <Container fluid>
            <Row>
              <Col className='game'>
                <HexGrid width={1000} height={1000} viewBox="-75 -50 100 100">
                  <GameLayout ref={this.gameLayoutRef} allowEditing={false}/>
                </HexGrid>
              </Col>
            </Row>
            <Row>
            <Col>
            <p><a href="/">Create your own map here!</a></p>
            <p style={{ fontSize: 'smaller' }}>This is a fan creation for Senjutsu, a board game by Stone Sword Games. The character icons and ice background image were created by Stone Sword games. The app is intended only for non-commercial fan use. Stone Sword Games retains copyright to all of its material. Other character icons are by 'Hey Rabbit' and are licensed from <a href="https://thenounproject.com/creator/heyrabbit/">The Noun Project</a>.</p>
            </Col>
            </Row>
          </Container>
        </div>
      </React.StrictMode>
    );
  }
}

export default SharePage;
