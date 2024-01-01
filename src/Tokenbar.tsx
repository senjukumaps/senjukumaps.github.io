import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TileIcon from './TileIcon';
import { HexGrid } from 'react-hexgrid';
import styles from './Tokenbar.module.css';
import { TokenType } from './types';

const tokens: Record<string, TokenType> = require('./tokens.json');

class Tokenbar extends React.Component {
  render() {
    return (
      <ListGroup id="sidebarListGroup" horizontal>
        {Object.keys(tokens).map((key: string) => {
          const token = tokens[key];
          return (
            <ListGroup.Item key={key} className={styles.tokenItem}>
              <HexGrid width={90} height={90} viewBox="-10 -10 20 20">
                <TileIcon text={token.name} id={key}/>
              </HexGrid>
              <p>{token.name}</p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default Tokenbar;