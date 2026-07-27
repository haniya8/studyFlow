//DashboardConstants.jsx
import ChecklistIcon from '@mui/icons-material/ChecklistOutlined';
import CheckCircleIcon from '@mui/icons-material/TaskAltOutlined';
import PendingIcon from '@mui/icons-material/PendingActionsOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined';


export const dashboardPageText = {
  heading: 'Dashboard', 
};

export function statCardsData(tasks){
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter((t) => !t.completed && new Date(t.dueDate) < new Date()).length;
  const inProgress = total - completed - overdue;
  return [
  { key: 'total', label: 'Total Tasks', count: total, icon: 'checklist' },
  { key: 'completed', label: 'Completed', count: 1, icon: 'checkCircle' },
  { key: 'inProgress', label: 'In Progress', count: 3, icon: 'pending' },
  { key: 'overdue', label: 'Overdue', count: 1, icon: 'error' },
 ];
}

export const iconMap = {
  checklist: <ChecklistIcon sx={ {color: 'primary.main'}}/>,
  checkCircle: <CheckCircleIcon sx={ {color: 'primary.main'}} />,
  pending: <PendingIcon sx={{color: '#7E3000'}} />,
  error: <ErrorIcon sx={{color: '#93000A'}}/>,
};




export const OverallProgressCardText = {
  message: "You are making steady progress this week. Keep up the momentum to finish your remaining tasks."
};