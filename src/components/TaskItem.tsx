import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, loading = false }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggle(task.id, !task.done)}
              disabled={loading}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${task.done ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-gray-600 ${task.done ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Creada: {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          disabled={loading}
          className="ml-4 text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};