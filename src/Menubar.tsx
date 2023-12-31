import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
// import styles from './Menubar.module.css';

interface MenubarProps {
  onSave: () => void;
  onRestore: () => void;
}

class Menubar extends React.Component<MenubarProps> {
  render() {
    return (
      <ListGroup horizontal>
      <ListGroup.Item><Button onClick={this.handleSave}>Save</Button></ListGroup.Item>        
      <ListGroup.Item><Button onClick={this.handleRestore}>Load</Button></ListGroup.Item>
      </ListGroup>
    );
  }
  handleSave = () => {
    this.props.onSave();
  }
  handleRestore = () => {
    this.props.onRestore();
  }
}

export default Menubar;