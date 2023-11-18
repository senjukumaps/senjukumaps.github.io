import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';
import './TilesLayout.css';
import { TokenImage } from './TokenImage';
const log = require('loglevel');

interface TilesLayoutProps {
  // Define the types of your props here
}

interface TilesLayoutState {
  hexagons: Hex[]; 
}

class TilesLayout extends Component<TilesLayoutProps, TilesLayoutState> {
  constructor(props: TilesLayoutProps) {
    super(props);
    // Initialize hexagons with some text and image
    const hexagons = GridGenerator.parallelogram(0, 1, -1, 1).map((hexagon, index) => {
      return Object.assign({}, hexagon, {
        text: `#${index}`,
        image: process.env.PUBLIC_URL + `/assets/token-${index%3}.png`
      });
    })
    this.state = { hexagons };
    log.console.error("SITLL USING TILESLAYOUT - this should be old unused code!");
    
  }

  onDragStart(event: React.MouseEvent, source: any) {
    // Could do something on onDragStart as well, if you wish
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event: React.MouseEvent, source: any, success: any) {
    if (!success) {
      return;
    }
    const { hexagons } = this.state;
    // TODO Drop the whole hex from array, currently somethings wrong with the patterns
    // const hexas = hexagons.filter(hex => !HexUtils.equals(targetHex, hex));
    const hexas = hexagons.map((hex: Hex) => {
      if (HexUtils.equals(source.state.hex, hex)) {
        hex.text = undefined;
        hex.image = undefined;
      }
      return hex;
    });
    log.info('TL onDragEnd', hexas);
    this.setState({ hexagons: hexas });
  }
  onClick(event: React.MouseEvent, source: any) {
    log.info('onClick event triggered with source:', source);
  }
  render() {
    const hexagons: Hex[] = this.state.hexagons;
    log.info('TL render', hexagons)
    return (
      <Layout className="tiles" size={{ x: 4, y: 4 }} flat={false} spacing={1.01} origin={{ x: 0, y: 0 }}>
        {
          hexagons.map((hex: Hex, i: number) => (
            <Hexagon
              key={i}
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
              { !!hex.image && <TokenImage id={HexUtils.getID(hex)} link={hex.image} size={{ width: 5, height: 5}} position={{ x: .9, y: 1.25}} /> }
            </Hexagon>
          ))
        }
      </Layout>
    );
  }
}

export default TilesLayout;
