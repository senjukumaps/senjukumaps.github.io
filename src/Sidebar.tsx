import React, { Component } from 'react';
import tokens from './tokens.json';
import Tile from './Tile';
import { HexGrid } from 'react-hexgrid';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';

class Sidebar extends Component {
  render() {
    return (
      <div>
        {tokens.map((token, index) => (
          <div key={index}>
            <HexGrid width={100} height={100} viewBox="-10 -10 20 20">
            <Tile text={token.name} image={token.image} id={index}/>
            </HexGrid>
          </div>
        ))}
      </div>
    );
  }
}

export default Sidebar;