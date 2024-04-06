import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TileIcon from './TileIcon';
import { HexGrid } from 'react-hexgrid';
import styles from './Tokenbar.module.css';
import { TokenType } from './types';

const tokens: Record<string, TokenType> = require('./tokens.json');

class Tokenbar extends React.Component {
  render() {
    // Define rows based on token types
    let rows = [["s1-core", "s1-terrain", "extra"], ["s1-char"], ["custom"]];

    return (
      <div>
        {rows.map((row, rowIndex) => (
          <ListGroup key={rowIndex} id={`sidebarListGroup-${rowIndex}`} horizontal className={styles.group}>
            {Object.keys(tokens).map((key) => {
              const token = tokens[key];
              // Check if the current token's type is in the current row
              if (row.includes(token.type)) {
                return (
                  <ListGroup.Item key={key} className={styles.tokenItem}>
                    <HexGrid width={90} height={90} viewBox="-10 -10 20 20">
                      <TileIcon name={token.name} text={token.name} id={key} image={token.image}/>
                    </HexGrid>
                    <p>{token.name}</p>
                  </ListGroup.Item>
                );
              }
              return null;
            })}
          </ListGroup>
        ))}
      </div>
    );
  }
}

export default Tokenbar;
