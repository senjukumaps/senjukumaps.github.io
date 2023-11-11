import React, { Component } from 'react';

interface TokenPatternProps {
  id: string;
  link: string;
  size: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
}

// Allows us to set the positioning of the image in a hexagon
export class TokenPattern extends Component<TokenPatternProps> {
  render() {
    const { id, link, size, position } = this.props;
    return (
      <defs>
        <pattern id={id} patternUnits="objectBoundingBox" x="0" y="0" width="1" height="1" >
          <image xlinkHref={link} x={position.x} y={position.y} width={size.width} height={size.height}  preserveAspectRatio="xMidYMid slice" />
        </pattern>
      </defs>
    );
  }
}
