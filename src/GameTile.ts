import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';
import './TileIcon.css';
import { TokenImage } from './TokenImage';
const log = require('loglevel');

// A GameTile is a Hex that can be rotated and could store other state
class GameTile extends Hex {
  rotation: number;
  color: string; 
  colors: string[] = ['transparent', 'red', 'yellow', 'green', 'blue'];
  colorIndex: number = 0;

  [key: string]: any;

  constructor(hex: Hex, rotation: number = 0) {
    super(hex.q, hex.r, hex.s);
    this.blocked = false;
    this.rotation = rotation;
    this.color = "transparent"; 
  }

  rotate(clockwise: boolean = true) {
    this.rotation += clockwise ? 60 : -60;
  }

  save(version: number) {
    // Save the non-default state of this tile
    if(version === 1) {
      let saveState: {[key: string]: any;} = {};
      if (this.color !== "transparent") {
        saveState["c"] = this.colorIndex;
      }
      if (this.rotation !== 0) {
        saveState["rot"] = this.rotation;
      }
      if (this.image !== undefined) {
        saveState["i"] = this.image;
      }
      if (Object.keys(saveState).length > 0)  {
        saveState["q"] = this.q;
        saveState["r"] = this.r;
        saveState["s"] = this.s;
        return saveState;
      }
      else {
        return null;
      }
    }
    else {
      log.error("Invalid version number:" + version);
      return null;
    }
  }

  restore(saveState: {[key: string]: any;}, version: number) {
    // Restore the state of this tile from the saveState object
    if(version === 1) {
      if (saveState.hasOwnProperty("q") && saveState.hasOwnProperty("r") && saveState.hasOwnProperty("s")) {
        this.q = saveState["q"];
        this.r = saveState["r"];
        this.s = saveState["s"];
      }
      else {
        log.error("Invalid saveState object:" + saveState);
        return;
      }
      if (saveState.hasOwnProperty("c")) {
        this.colorIndex = saveState["c"];
        this.color = this.colors[this.colorIndex];
      }
      if (saveState.hasOwnProperty("rot")) {
        this.rotation = saveState["rot"];
      }
      if (saveState.hasOwnProperty("i")) {
        this.image = saveState["i"];
        this.blocked = true;
      }
    }
    else {
      log.error("Invalid version number:" + version);
      return;
    }
  }
}
  

export default GameTile;