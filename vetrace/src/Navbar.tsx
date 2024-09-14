import React from 'react';
import './App.css';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography
} from '@mui/material';
import { States } from './App';

interface AppHeaderProps {
  setState: React.Dispatch<React.SetStateAction<States>>
}

export default function AppHeader({ setState }: AppHeaderProps) {
  const handleDrawerItemClick = (selectedState: States) => {
    setState(selectedState);
  };

  return (
    <Drawer variant="permanent" anchor="top">
      <List
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'black',
          color: 'white',
          pr: 2,
          pl: 2
        }}
      >
        <ListItem component="button" onClick={() => handleDrawerItemClick(States.Screen1)} sx={{
          maxWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}>
          <Typography>
            Screen1
          </Typography>
        </ListItem>
        <ListItem component="button" onClick={() => handleDrawerItemClick(States.Screen2)} sx={{
          maxWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}>
          <Typography>
            Screen2
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
}