import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';
import './Tile.css';
import { TokenPattern } from './TokenPattern';
const log = require('loglevel');

interface TileProps {
  // Define the types of your props here
  text: string;
  image: string;
  id: number;
}

interface TileState {
  hex: Hex;
}

class Tile extends Component<TileProps, TileState> {
  constructor(props: TileProps) {
    super(props);
    const TILE_HEX_OFFSET = 1;
    // create a new hexagon. Needs a fake, unique coordinate or pattern breaks
    // every coordinate can only have one pattern, so we use invalid R,0,0
    // coordinates which won't actually appear in a real grid (as far as I can tell)
    const hex = new Hex(TILE_HEX_OFFSET + this.props.id,0,0);
    hex.text = this.props.text;
    hex.image = process.env.PUBLIC_URL + "/assets/" + this.props.image;
    
    this.state = {hex };
  }

  onDragStart(event: React.MouseEvent, source: any) {
    // Could do something on onDragStart as well, if you wish
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event: React.MouseEvent, source: any, success: any) {
    log.info('TL onDragEnd');
  }
  onClick(event: React.MouseEvent, source: any) {
    log.info('Tile onClick:', source, this.state.hex);
  }
  render() {
    const {hex} = this.state;
    return (
        // Adjust origin so that tile will be centered around fake coordinate
        <Layout className="tile" size={{ x: 10, y: 10 }} flat={false} spacing={1.01} origin={{ x: (1+this.props.id)*(-17.5), y: 0 }}>
        <Hexagon
              key={this.props.id}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              fill={(hex.image) ? HexUtils.getID(hex) : undefined}
              data={hex}
              onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
              onClick={(e, h) => this.onClick(e, h) }
            >
              <Text>{hex.text}</Text>
              { !!hex.image && <TokenPattern id={HexUtils.getID(hex)} link={hex.image} size={{ width: 15, height: 15}} position={{ x: 1, y: 2}} /> }
            </Hexagon>
        </Layout>
    );
  }
}

export default Tile;
