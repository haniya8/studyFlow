function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDueDateLabel(dueDateStr) {
  const due = parseLocalDate(dueDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round((due - today) / 86400000);

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      dueLabel: overdueDays === 1 ? '1 day overdue' : `${overdueDays} days overdue`,
      urgent: true,
    };
  }

  if (diffDays === 0) {
    return { dueLabel: 'Today', urgent: true };
  }

  if (diffDays === 1) {
    return { dueLabel: 'Tomorrow', urgent: true };
  }

  if (diffDays <= 7) {
    return {
      dueLabel: due.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      urgent: false,
    };
  }

  const options = { month: 'short', day: 'numeric' };
  if (due.getFullYear() !== today.getFullYear()) {
    options.year = 'numeric';
  }

  return {
    dueLabel: due.toLocaleDateString('en-US', options),
    urgent: false,
  };
}
