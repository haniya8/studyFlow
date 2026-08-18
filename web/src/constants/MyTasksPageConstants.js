// src/constants/MyTasksPageConstants.js
export const statuses = ['All', 'Doing', 'Done'];
export const priorities = [
  { value: 'LOW', label: 'Low Priority' },
  { value: 'MEDIUM', label: 'Medium Priority' },
  { value: 'HIGH', label: 'High Priority' },
];
export const defaultPriority = 'MEDIUM';


export const tasksPageText = {
  heading: 'My Tasks',
  subheading: 'Manage and organize your academic workflow.',
  subjectLabel: 'Subject:',
  statusLabel: 'Status:',
  createTaskButton: 'Create Task',
};

export const createTaskModalText = {
  heading: 'New Task',
  subheading: 'Fill out the details below to add a new task to your workspace.',
  titleLabel: 'TASK TITLE',
  titlePlaceholder: 'e.g., Read Chapter 4: Calculus',
  descriptionLabel: 'DESCRIPTION',
  descriptionPlaceholder: 'Add notes, requirements, or links...',
  subjectLabel: 'SUBJECT',
  priorityLabel: 'PRIORITY',
  dueDateLabel: 'DUE DATE',
  cancelButton: 'Cancel',
  saveButton: 'Save Task',
};

export const createTaskModalErrors = {
  title: 'Task title is required',
  subject: 'Please select a subject',
  dueDate: 'Due date is required',
};

export const deleteTaskDialogText = {
  title: 'Delete Task',
  message: (taskTitle) =>
    `Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`,
  cancelButton: 'Cancel',
  confirmButton: 'Delete',
};

