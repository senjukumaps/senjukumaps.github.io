import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';
import './TileIcon.css';
import { TokenImage } from './TokenImage';
const log = require('loglevel');

// A GameTile is a Hex that can be rotated and could store other state
class GameTile extends Hex {
  rotation: number;
  [key: string]: any;

  constructor(hex: Hex, rotation: number = 0) {
    super(hex.q, hex.r, hex.s);
    this.blocked = false;
    this.rotation = rotation;
  }

  rotate(clockwise: boolean) {
    this.rotation += clockwise ? 60 : -60;
  }

  // Add more methods as needed...
}
  

export default GameTile;