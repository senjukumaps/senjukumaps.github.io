import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TileIcon from './TileIcon';
import { HexGrid } from 'react-hexgrid';
import tokens from './tokens.json';
import styles from './Sidebar.module.css';

class Sidebar extends React.Component {
  render() {
    return (
      <ListGroup id="sidebarListGroup" horizontal>
        {tokens.map((token: any, index: number) => (
        <ListGroup.Item key={index} className={styles.tokenItem}>
          <HexGrid width={90} height={90} viewBox="-10 -10 20 20">
            <TileIcon text={token.name} image={token.image} id={index}/>
          </HexGrid>
          <p>{token.name}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
    );
  }
}

export default Sidebar;