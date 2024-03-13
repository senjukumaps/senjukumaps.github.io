import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
// import styles from './Menubar.module.css';
const log = require('loglevel');


interface MenubarProps {
  onSave?: () => void;
  onRestore?: (id:any) => void;
  onClear?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
}

class Menubar extends React.Component<MenubarProps> {
  render() {
    let debugMode = false;
    return (
      <ListGroup horizontal>
      {this.props.onShare && <ListGroup.Item><Button onClick={this.handleShare}>Share</Button></ListGroup.Item>}
      {debugMode && this.props.onSave && <ListGroup.Item><Button onClick={this.handleSave}>Save</Button></ListGroup.Item>}
      {debugMode && this.props.onRestore && <ListGroup.Item><Button onClick={this.handleRestore}>Load</Button></ListGroup.Item>}
      {this.props.onClear && <ListGroup.Item><Button onClick={this.handleClear}>Clear</Button></ListGroup.Item>}
      {debugMode && this.props.onEdit && <ListGroup.Item><Button onClick={this.handleEdit}>Edit</Button></ListGroup.Item>}
      </ListGroup>
    );
  }
  handleSave = () => {
    if(this.props.onSave){
      this.props.onSave();
    }
  }
  handleShare = () => {
    if(this.props.onShare){
      this.props.onShare();
    }
  }
  handleClear = () => {
    if(this.props.onClear){
      this.props.onClear();
    }
  }
  handleEdit = () => {
    if(this.props.onEdit){
      this.props.onEdit();
    }
  }
  handleRestore = (id: any) => {
    if(this.props.onRestore){
      this.props.onRestore(id);
    }
  }
}

export default Menubar;