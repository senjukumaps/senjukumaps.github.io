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
        <>
          <image 
            xlinkHref={process.env.PUBLIC_URL + "/assets/hexagon.svg"} 
            x={-size.width/2} 
            y={-size.height/2} 
            width={size.width*1.0} 
            height={size.height*1.0}  
            preserveAspectRatio="xMidYMid slice" 
            transform={`rotate(${rotation}, 0, 0)`}          />
          <image 
            xlinkHref={process.env.PUBLIC_URL + "/assets/" + link}
            x={-size.width*0.75/2} 
            y={-size.height*0.75/2} 
            width={size.width*0.75} 
            height={size.height*0.75}  
            preserveAspectRatio="xMidYMid slice" 
            />
        </>
    );

  }
}
