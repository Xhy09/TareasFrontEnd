import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { tasksService } from '../services/tasks';
import { Task } from '../types';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const tasksData = await tasksService.getAll();
      setTasks(tasksData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: { title: string; description?: string }) => {
    setFormLoading(true);
    setError('');
    try {
      const newTask = await tasksService.create(data);
      setTasks([newTask, ...tasks]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la tarea');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleTask = async (id: number, done: boolean) => {
    setError('');
    try {
      const updatedTask = await tasksService.update(id, { done });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar la tarea');
    }
  };

  const handleDeleteTask = async (id: number) => {
    setError('');
    try {
      await tasksService.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar la tarea');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Tareas</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Task Form */}
        <div className="mb-8">
          <TaskForm onSubmit={handleCreateTask} loading={formLoading} />
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando tareas...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};