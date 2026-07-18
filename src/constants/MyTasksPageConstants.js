// src/constants/tasksPageContent.js

export const filterSubjects = ['All', 'Math', 'Science', 'History'];
export const statuses = ['All', 'Doing', 'Done'];

// Used by CreateTaskModal.jsx dropdown (no "All" — a task must have a real subject)
export const taskSubjects = ['Math', 'Science', 'History'];
export const priorities = ['Low Priority', 'Medium Priority', 'High Priority'];
export const defaultPriority = 'Medium Priority';


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

