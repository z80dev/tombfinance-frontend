import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const WalletCard = ({ icon, onConnect, title }) => (
  <ListItem button onClick={onConnect}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

export default WalletCard;
