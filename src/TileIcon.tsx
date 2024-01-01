import React, { Component } from 'react';
import { Layout, Hexagon, Text, Hex } from 'react-hexgrid';
import './TileIcon.css';
import { TokenImage } from './TokenImage';
import GameTile from './GameTile';
const log = require('loglevel');

interface TileIconProps {
  text: string;
  id: string;
  
}

interface TileIconState {
  hex: GameTile;
}

// A single Hex Tile Icon that can be used outside of the gameboard 
class TileIcon extends Component<TileIconProps, TileIconState> {
  constructor(props: TileIconProps) {
    super(props);
    const hex = new GameTile(new Hex(0,0,0), 0);
    hex.text = this.props.text;
    hex.image = this.props.text;
    hex.blocked = true;
    hex.name = this.props.text;
    
    this.state = {hex };
  }

  onDragStart(event: React.MouseEvent, source: any) {
    // Could do something on onDragStart as well, if you wish
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event: React.MouseEvent, source: any, success: any) {
    log.debug('TileIcon onDragEnd');
  }
  onClick(event: React.MouseEvent, source: any) {
    log.debug('TileIcon onClick:', source);
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
              { !!hex.image && <TokenImage id={"token-" + this.props.id} link={hex.image} size={{ width: 15, height: 15}} /> }
            </Hexagon>
        </Layout>
    );
  }
}

export default TileIcon;
