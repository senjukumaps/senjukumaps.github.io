import React, { Component } from 'react';

interface TokenPatternProps {
  id: string;
  link: string;
  size: {
    width: number;
    height: number;
  };
  rotation: number;
}

// Allows us to set the positioning of the image in a hexagon
export class TokenImage extends Component<TokenPatternProps> {
  static defaultProps = {
    rotation: 0
  };
  render() {
    const { id, link, size, rotation } = this.props;
    return (
          <image 
            xlinkHref={link} 
            x={-size.width/2} 
            y={-size.height/2} 
            width={size.width} 
            height={size.height}  
            preserveAspectRatio="xMidYMid slice" 
            transform={`rotate(${rotation}, 0, 0)`}          />
    );
  }
}
