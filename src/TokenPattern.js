import React, { Component } from 'react';

export class TokenPattern extends Component {
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
