import React, { Component } from 'react';
import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils } from 'react-hexgrid';
import './TilesLayout.css';
import { TokenPattern } from './TokenPattern';
const log = require('loglevel');

class TilesLayout extends Component {
  constructor(props) {
    super(props);
    // Initialize hexagons with some text and image
    const hexagons = GridGenerator.parallelogram(0, 1, -1, 1).map((hexagon, index) => {
      return Object.assign({}, hexagon, {
        // text: `#${index}`,
        image: process.env.PUBLIC_URL + `/assets/token-${index%3}.png`
      });
    })
    this.state = { hexagons };
  }

  onDragStart(event, source) {
    // Could do something on onDragStart as well, if you wish
  }

  // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
  onDragEnd(event, source, success) {
    if (!success) {
      return;
    }
    const { hexagons } = this.state;
    // TODO Drop the whole hex from array, currently somethings wrong with the patterns
    // const hexas = hexagons.filter(hex => !HexUtils.equals(targetHex, hex));
    const hexas = hexagons.map(hex => {
      if (HexUtils.equals(source.state.hex, hex)) {
        hex.text = null;
        hex.image = null;
      }
      return hex;
    });
    log.info('TL onDragEnd', hexas);
    this.setState({ hexagons: hexas });
  }

  render() {
    const { hexagons } = this.state;
    return (
      <Layout className="tiles" size={{ x: 4, y: 4 }} flat={false} spacing={1.01} origin={{ x: 0, y: 0 }}>
        {
          hexagons.map((hex, i) => (
            <Hexagon
              key={i}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              fill={(hex.image) ? HexUtils.getID(hex) : null}
              data={hex}
              onDragStart={(e, h) => this.onDragStart(e, h)}
              onDragEnd={(e, h, s) => this.onDragEnd(e, h, s)}
            >
              <Text>{hex.text}</Text>
              { !!hex.image && <TokenPattern id={HexUtils.getID(hex)} link={hex.image} size={{ width: 5, height: 5}} position={{ x: .9, y: 1.25}} /> }
            </Hexagon>
          ))
        }
      </Layout>
    );
  }
}

export default TilesLayout;
