import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number, done: boolean) => void;
  onDeleteTask: (id: number) => void;
  loading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask, loading = false }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas</h3>
        <p className="text-gray-500">Comienza creando tu primera tarea</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          loading={loading}
        />
      ))}
    </div>
  );
};