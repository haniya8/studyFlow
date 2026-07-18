export const dashboardPageText = {
  heading: 'Dashboard', 
};

export const statCardsData = [
  { key: 'total', label: 'Total Tasks', count: 12, icon: 'checklist' },
  { key: 'completed', label: 'Completed', count: 1, icon: 'checkCircle' },
  { key: 'inProgress', label: 'In Progress', count: 3, icon: 'pending' },
  { key: 'overdue', label: 'Overdue', count: 1, icon: 'error' },
];

export const iconMap = {
  checklist: <ChecklistIcon />,
  checkCircle: <CheckCircleIcon />,
  pending: <PendingIcon />,
  error: <ErrorIcon />,
};