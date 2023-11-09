import React, { useState } from 'react';
import { HexGrid } from 'react-hexgrid';
import GameLayout from './GameLayout';
import TilesLayout from './TilesLayout';
import { Offcanvas, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="app">
      <Button variant="primary" onClick={handleShow}>
        Launch Sidebar
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h2>Header </h2>
          <HexGrid width={200} height={200} viewBox="-15 -15 30 40">
          <TilesLayout />
          </HexGrid>
        </Offcanvas.Body>
      </Offcanvas>
      
      <h2>Drag & drop</h2>
      <p>Drag tiles from the right-side grid and drop them to the left grid.</p>
      <p>You can also drag & drop them within the left board, but not back to the right side.</p>
      <p>
        <small>
          TilesLayout (on the right) does not handle `onDrop` and `onDragOver` and that's why it's not possible to drop anything on these tiles.
          GameLayout (on the left) handles all the events, so it's possible to start a drag as well as drop tiles.
          It also implements custom check to disallow drop on certain tiles, like the ones that are blocked or
          already have content in them.
        </small>
      </p>
      <HexGrid width={1000} height={1000} viewBox="-75 -50 100 100">
        <GameLayout />
      </HexGrid>
    </div>
  );
}

export default App;