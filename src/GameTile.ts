import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';
import './TileIcon.css';
import { TokenImage } from './TokenImage';
import { TokenType } from './types';
const tokens: Record<string, TokenType> = require('./tokens.json');

const log = require('loglevel');

// A GameTile is a Hex that can be rotated and could store other state
class GameTile extends Hex implements TokenType{
  rotation: number;
  color: string; 
  colors: string[] = ['transparent', 'red', 'yellow', 'green', 'blue'];
  colorIndex: number = 0;
  name: string = "Empty";
  allowRotate: boolean = true;
  image: string | undefined;
  blocked: boolean;
  type: string = "tile";

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

  setToken(token: TokenType) {
    this.name = token.name;
    this.text = token.name;
    this.image = token.image;
    this.blocked = token.blocked;
    this.rotation = token.rotation ? token.rotation : 0;
  }
  clearToken() {
    this.name = "Empty";
    this.text = "Empty";
    this.image = undefined;
    this.blocked = false;
  }

  save(version: number) {
    // Save the non-default state of this tile
    if(version === 1) {
      let saveState: {[key: string]: any;} = {};
      if (this.color !== "transparent") {
        saveState["c"] = this.colorIndex;
      }
      if (this.image !== undefined) {
        // if there is an image, save the ID and rotation to restore later
        saveState["id"] = this.name;
        if (this.rotation !== 0) {
          saveState["rot"] = this.rotation;
        }
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
      if (saveState.hasOwnProperty("id")) {
        this.image = tokens[saveState["id"]].name;
        this.name = tokens[saveState["id"]].name;
        this.text = tokens[saveState["id"]].name;
        // FIXME: this works, but is very redundant
        this.blocked = true;
        if (saveState.hasOwnProperty("rot")) {
          this.rotation = saveState["rot"];
        }
      }
    }
    else {
      log.error("Invalid version number:" + version);
      return;
    }
  }
}
  

export default GameTile;