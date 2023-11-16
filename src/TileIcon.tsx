import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';
import './TileIcon.css';
import { TokenPattern } from './TokenPattern';
const log = require('loglevel');

interface TileIconProps {
  text: string;
  image: string;
  id: number;
}

interface TileIconState {
  hex: Hex;
}

// A single Hex Tile Icon that can be used outside of the gameboard 
class TileIcon extends Component<TileIconProps, TileIconState> {
  constructor(props: TileIconProps) {
    super(props);
    const hex = new Hex(0,0,0);
    hex.text = this.props.text;
    hex.image = process.env.PUBLIC_URL + "/assets/" + this.props.image;
    
    this.state = {hex };
  }

  onDragStart(event: React.MouseEvent, source: any) {
    // Could do something on onDragStart as well, if you wish
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event: React.MouseEvent, source: any, success: any) {
    log.info('TileIcon onDragEnd');
  }
  onClick(event: React.MouseEvent, source: any) {
    log.info('TileIcon onClick:', source);
  }
  render() {
    const {hex} = this.state;
    return (
        // Adjust origin so that tile will be centered around fake coordinate
        <Layout className="tileIcon" size={{ x: 10, y: 10 }} flat={true} spacing={0} origin={{ x: 0, y: 0 }}>
        <Hexagon
              key={this.props.id}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              fill={(hex.image) ? "token-" + this.props.id : undefined}
              data={hex}
              onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
              onClick={(e, h) => this.onClick(e, h) }
            >
              <Text>{hex.text}</Text>
               {/* position is magic number to make it centered */}
              { !!hex.image && <TokenPattern id={"token-" + this.props.id} link={hex.image} size={{ width: 15, height: 15}} position={{ x: 2.1, y: 1.2}} /> }
            </Hexagon>
        </Layout>
    );
  }
}

export default TileIcon;
