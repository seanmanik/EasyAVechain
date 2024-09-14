import './App.css';

import { Box } from '@mui/material';
import Navbar from './Navbar';
import { useState } from 'react';
import Screen1 from './Screen1';
import Screen2 from './Screen2';

export enum States {
  Screen1 = 1,
  Screen2 = 2,
}

export default function App() {
  const [state, setState] = useState<States>(States.Screen2);

  return (
    <>
      <Box sx={{ height: '100vh', overflow: 'hidden' }}>
        <Navbar setState={setState} />

        {state === States.Screen1 ? (
          <Screen1 />
        ) : null}
        {state === States.Screen2 ? (
          <Screen2 />
        ) : null}
      </Box>
    </>
  );

}