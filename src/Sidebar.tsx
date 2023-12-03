import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { Component } from 'react';
import tokens from './tokens.json';
import TileIcon from './TileIcon';
import { HexGrid } from 'react-hexgrid';
import juice from 'juice';

const log = require('loglevel');

import { GridGenerator, Layout, Hexagon, Text, Pattern, HexUtils, Hex } from 'react-hexgrid';

import { Canvg } from 'canvg';

async function downloadSVG(svgElement: SVGElement, filename: string) {
  // TIM NOTE: This version works for SVG output, but not as PNG if there are any images (either pngs or svgs) embedded
  // It also doesn't apply CSS styles 
  const svgStringWithStyles = juice(svgElement.outerHTML);
  // Create a canvas
  const canvas = document.createElement('canvas');
  
  // Add the XLink namespace to the SVG string
  let svgString = svgStringWithStyles.replace('<svg ', '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ');
  // Add base URL to start of all image hrefs
  svgString = svgString.replace(/href="(.*?)"/g, 'href="https://senjutsumaps.github.io/$1"');

  // Save SVG to file for debugging
  const svgBlob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
  const svgUrl = URL.createObjectURL(svgBlob);
  const svgLink = document.createElement('a');
  svgLink.href = svgUrl;
  svgLink.download = 'debug.svg';
  svgLink.click();

  // Convert SVG to canvas using canvg
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const canvgInstance = Canvg.fromString(ctx, svgString);
    await canvgInstance.start();
  }

  // Convert canvas to PNG
  const imgData = canvas.toDataURL('image/png');

  // Create a download link
  const link = document.createElement('a');
  link.download = filename;
  link.href = imgData;
  link.click();
}

import html2canvas from 'html2canvas';

async function downloadSVG2(svgElement: any, filename: string) {
  const canvas = await html2canvas(svgElement, { allowTaint: true });
  const imgData = canvas.toDataURL('image/png');

  // TIM NOTE: this was second approach suggested by AI, but it just gives an error for not finding element in iframe

  // Create a download link
  const link = document.createElement('a');
  link.download = filename;
  link.href = imgData;
  link.click();
}

// function downloadSVG(svgElement: SVGElement, filename: string) {
//   // Create a canvas
//   const canvas = document.createElement('canvas');
  
//   // Convert SVG to canvas using canvg
//   canvg(canvas, svgElement.outerHTML);

//   // Convert canvas to PNG
//   const imgData = canvas.toDataURL('image/png');

//   // Create a download link
//   const link = document.createElement('a');
//   link.download = filename;
//   link.href = imgData;
//   link.click();
// }

class Sidebar extends Component {
  render() {
    return (
      <div>
        <Button variant="success" onClick={() => {
        const svgElement = document.querySelector('div#map')?.querySelector('svg');
        if (svgElement) {
          downloadSVG(svgElement, 'map.png');
          console.error('SVG element with class "game" found');
          log.info(svgElement);
        } else {
          console.error('SVG element with class "game" not found');

        }
      }}>Save</Button>
        {tokens.map((token, index) => (
          <div key={index}>
            <HexGrid width={100} height={100} viewBox="-10 -10 20 20">
            <TileIcon text={token.name} image={token.image} id={index}/>
            </HexGrid>
          </div>
        ))}
      </div>
    );
  }
}

export default Sidebar;