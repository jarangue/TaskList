import React from 'react';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import { Container, Box, Typography,Paper } from '@mui/material';

function App() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Administrador de tareas
        </Typography>
        <TaskForm/>
        <TasksList/>
      </Box>
    </Container>
  );
}



export default App;
