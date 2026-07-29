// components/CreateTaskModal.jsx
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {useTasks} from '../../contexts/TasksContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { priorities, createTaskModalText, createTaskModalErrors, defaultPriority } from '../../constants/MyTasksPageConstants';
import { useSubjects } from '../../contexts/SubjectsContext';

const createTaskValidationSchema = Yup.object({
  title: Yup.string().trim().required(createTaskModalErrors.title),
  description: Yup.string(),
  subject: Yup.mixed().nullable().required(createTaskModalErrors.subject),
  priority: Yup.string().required(),
  dueDate: Yup.string().required(createTaskModalErrors.dueDate),
});

export default function CreateTaskModal({ open, onClose }) {
  const { subjects, addSubject } = useSubjects();
  const { addTask } = useTasks();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        subject: null,
        priority: defaultPriority,
        dueDate: '',
      }}
      validationSchema={createTaskValidationSchema}
      onSubmit={(values, { resetForm }) => {
        addTask({
          title: values.title,
          description: values.description,
          subjectId: values.subject.id,
          priority: values.priority,
          dueDate: values.dueDate,
        });
        resetForm();
        onClose();
      }}
    >
      {({
        values, errors, touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        resetForm,
      }) => {
        const handleClose = () => {
          resetForm();
          onClose();
        };

        return (
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{createTaskModalText.heading}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {createTaskModalText.subheading}
                </Typography>
              </Box>

              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <Form>
              <DialogContent>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.titleLabel}</Typography>
                <TextField
                  name="title"
                  placeholder={createTaskModalText.titlePlaceholder}
                  fullWidth
                  size="small"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{ mb: 2, mt: 0.5 }}
                />

                <Typography variant="caption" sx={{ fontWeight: 600 }}>DESCRIPTION</Typography>
                <TextField
                  name="description"
                  placeholder={createTaskModalText.descriptionPlaceholder}
                  fullWidth
                  multiline
                  rows={3}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ mb: 2, mt: 0.5 }}
                />

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.subjectLabel}</Typography>
                    <Autocomplete
                      size="small"
                      value={values.subject}
                      options={subjects}
                      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                      isOptionEqualToValue={(option, val) => option.id === val?.id}
                      filterOptions={(options, params) => {
                        const filtered = options.filter((o) =>
                          o.name.toLowerCase().includes(params.inputValue.toLowerCase())
                        );
                        const exists = options.some(
                          (o) => o.name.toLowerCase() === params.inputValue.toLowerCase()
                        );
                        if (params.inputValue !== '' && !exists) {
                          filtered.push({ inputValue: params.inputValue, isNew: true });
                        }
                        return filtered;
                      }}
                      onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                          setFieldValue('subject', addSubject(newValue));
                        } else if (newValue?.isNew) {
                          setFieldValue('subject', addSubject(newValue.inputValue));
                        } else {
                          setFieldValue('subject', newValue);
                        }
                      }}
                      onBlur={() => setFieldTouched('subject', true)}
                      renderOption={(props, option) => (
                        <Box component="li" {...props} key={option.id ?? option.inputValue}>
                          {option.isNew ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6C5CE7' }}>
                              <AddIcon fontSize="small" />
                              <Typography variant="body2">Add "{option.inputValue}"</Typography>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: option.color }} />
                              {option.name}
                            </Box>
                          )}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select or add"
                          error={touched.subject && Boolean(errors.subject)}
                          helperText={touched.subject && errors.subject}
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.priorityLabel}</Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ mt: 0.5 }}
                    >
                      {priorities.map((p) => (
                        <MenuItem key={p} value={p}>{p}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>

                <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.dueDateLabel}</Typography>
                <TextField
                  type="date"
                  size="small"
                  name="dueDate"
                  value={values.dueDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dueDate && Boolean(errors.dueDate)}
                  helperText={touched.dueDate && errors.dueDate}
                  sx={{ mt: 0.5, width: '50%' }}
                />
              </DialogContent>

              <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button onClick={handleClose} variant="outlined">{createTaskModalText.cancelButton}</Button>
                <Button type="submit" variant="contained">{createTaskModalText.saveButton}</Button>
              </DialogActions>
            </Form>
          </Dialog>
        );
      }}
    </Formik>
  );
}
