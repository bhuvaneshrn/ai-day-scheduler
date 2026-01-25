function rescheduleTasks(tasks) {
  // Sort again by priority & deadline
  tasks.sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    return new Date(a.deadline) - new Date(b.deadline);
  });

  let currentTime = new Date();

  tasks.forEach((task) => {
    const start = new Date(currentTime);
    const end = new Date(currentTime);
    end.setMinutes(end.getMinutes() + task.duration);

    task.scheduledStart = start;
    task.scheduledEnd = end;

    currentTime = end;
  });

  return tasks;
}

module.exports = rescheduleTasks;
