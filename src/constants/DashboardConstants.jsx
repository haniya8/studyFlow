//DashboardConstants.jsx
import ChecklistIcon from '@mui/icons-material/ChecklistOutlined';
import CheckCircleIcon from '@mui/icons-material/TaskAltOutlined';
import PendingIcon from '@mui/icons-material/PendingActionsOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined';


export const dashboardPageText = {
  heading: 'Dashboard', 
};
function isOverdue(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);       // strip time, keep local midnight
  due.setHours(0, 0, 0, 0);          // treat due date as local midnight too, for fair comparison
  return due < today;
}

export function statCardsData(tasks){
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter((t) => !t.completed && isOverdue(t.dueDate)).length;
  const inProgress = total - completed - overdue;
  
  return [
  { key: 'total', label: 'Total Tasks', count: total, icon: 'checklist' },
  { key: 'completed', label: 'Completed', count: completed, icon: 'checkCircle' },
  { key: 'inProgress', label: 'In Progress', count: inProgress, icon: 'pending' },
  { key: 'overdue', label: 'Overdue', count: overdue, icon: 'error' },
 ];
}

export const iconMap = {
  checklist: <ChecklistIcon sx={ {color: 'primary.main'}}/>,
  checkCircle: <CheckCircleIcon sx={ {color: 'primary.main'}} />,
  pending: <PendingIcon sx={{color: '#7E3000'}} />,
  error: <ErrorIcon sx={{color: '#93000A'}}/>,
};




export const OverallProgressCardText = {
  message: "You are making steady progress this week. Keep up the momentum to finish your remaining tasks.",
};

export function getOverallProgress(tasks) {
  const total = tasks.length;

  if (total === 0) {
    return {
      percentage: 0,
      message: 'Add your first task to start tracking your progress.',
    };
  }

  const completed = tasks.filter((t) => t.completed).length;
  const percentage = Math.round((completed / total) * 100);

  if (percentage === 0) {
    return {
      percentage,
      message: "You haven't completed any tasks yet. Get started on your first one!",
    };
  }

  if (percentage === 100) {
    return {
      percentage,
      message: 'All tasks completed! Great work this week.',
    };
  }

  if (percentage < 50) {
    return {
      percentage,
      message: `You've completed ${completed} of ${total} tasks. Keep going!`,
    };
  }

  return {
    percentage,
    message: OverallProgressCardText.message,
  };
}