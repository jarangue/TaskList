import { useGetTasksQuery, useDeleteTasksMutation, useUpdateTasksMutation } from "../api/apiSlice";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography, CircularProgress, Alert, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/CheckCircle';

const TasksList = () => {
    const { data: tasks, isError, isLoading, error } = useGetTasksQuery();
    const [deleteTask] = useDeleteTasksMutation();
    const [updateTask] = useUpdateTasksMutation();

    if (isLoading) {
        return <CircularProgress />;
    } else if (isError) {
        return <Alert severity="error">Error: {error.message}</Alert>;
    }

    return (
        <List>
            {tasks.map(task => (
                <ListItem 
                    key={task.id} 
                    sx={{ 
                        backgroundColor: task.completed ? 'lightgreen' : 'lightcoral', 
                        marginBottom: 1, 
                        borderRadius: 2 
                    }}
                >
                    <ListItemText 
                        primary={
                            <Box display="flex" alignItems="center">
                                {task.completed ? <DoneIcon color="success" /> : <PendingIcon color="warning" />}
                                <Typography variant="h6" ml={1}>
                                    {task.name}
                                </Typography>
                            </Box>
                        } 
                        secondary={task.description}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <Checkbox 
                            edge="end"
                            checked={task.completed}
                            onChange={(e) => updateTask({
                                updatedTask: {
                                    ...task,
                                    completed: e.target.checked
                                }
                              })}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default TasksList;
