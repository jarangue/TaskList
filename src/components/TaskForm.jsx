import { useCreateTasksMutation } from "../api/apiSlice";
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Esquema de validación con Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Nombre tarea es requerido')
    .min(3, 'Nombre tarea debe tener al menos 3 caracteres'),
  description: Yup.string()
    .required('Descripción es requerida')
    .min(5, 'Descripción debe tener al menos 5 caracteres'),
  completed: Yup.boolean()
});

const TaskForm = () => {
  const [createTask] = useCreateTasksMutation();

  // Configurar Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      completed: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      createTask(values);
      resetForm();
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Nombre tarea"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Descripción"
        variant="outlined"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="completed"
            name="completed"
            checked={formik.values.completed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        }
        label="Completed"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
}

export default TaskForm;





// import { useCreateTasksMutation } from "../api/apiSlice";
// import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';

// const TaskForm = () => {

//     const [createTask] = useCreateTasksMutation();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const name = e.target.name.value.trim();
//         const description = e.target.description.value.trim();
//         const completed = e.target.completed.checked;

//         createTask({
//             name,
//             description, 
//             completed
//         });
//     }

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <TextField name="name" label="Task Name" variant="outlined" />
//             <TextField name="description" label="Description" variant="outlined" multiline rows={4} />
//             <FormControlLabel control={<Checkbox name="completed" />} label="Completed" />
//             <Button type="submit" variant="contained" color="primary">
//                 Add Task
//             </Button>
//         </Box>
//     );
// }

// export default TaskForm;
