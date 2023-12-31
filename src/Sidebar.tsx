import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TileIcon from './TileIcon';
import { HexGrid } from 'react-hexgrid';
import styles from './Sidebar.module.css';

interface TokenType {
  name: string;
  image: string;
  allowRotate: boolean;
  // add other properties if any
}

const tokens: Record<string, TokenType> = require('./tokens.json');

class Sidebar extends React.Component {
  render() {
    return (
      <ListGroup id="sidebarListGroup" horizontal>
        {Object.keys(tokens).map((key: string) => {
          const token = tokens[key];
          return (
            <ListGroup.Item key={key} className={styles.tokenItem}>
              <HexGrid width={90} height={90} viewBox="-10 -10 20 20">
                <TileIcon text={token.name} image={token.image} id={key}/>
              </HexGrid>
              <p>{token.name}</p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default Sidebar;