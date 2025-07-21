
'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Pencil, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskListProps {
  tasks: Task[];
  setTasks: (tasks: Task[] | ((tasks: Task[]) => Task[])) => void;
}

export function TaskList({ tasks, setTasks }: TaskListProps) {
  const [isClient, setIsClient] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const task: Task = { id: Date.now().toString(), text: newTask.trim(), completed: false };
    setTasks((prev) => [task, ...prev]);
    setNewTask('');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  
  const handleStartEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const handleSaveEdit = () => {
    if (!editingTaskId) return;
    setTasks(prev => prev.map(task => 
      task.id === editingTaskId ? { ...task, text: editingText } : task
    ));
    setEditingTaskId(null);
    setEditingText('');
  };

  if (!isClient) {
    return (
        <Card className="h-full shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">To-Do List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">To-Do List</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-grow h-[300px] pr-4">
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                />
                 {editingTaskId === task.id ? (
                  <Input value={editingText} onChange={e => setEditingText(e.target.value)} className="flex-1 h-8" onBlur={handleSaveEdit} autoFocus onKeyPress={e => e.key === 'Enter' && handleSaveEdit()}/>
                 ) : (
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`flex-1 text-sm ${
                      task.completed ? 'text-muted-foreground line-through' : ''
                    }`}
                  >
                    {task.text}
                  </label>
                 )}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   {editingTaskId === task.id ? (
                     <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleSaveEdit}><Check className="h-4 w-4 text-green-500" /></Button>
                   ) : (
                     <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleStartEditing(task)}><Pencil className="h-4 w-4" /></Button>
                   )}
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleDeleteTask(task.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
             {tasks.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Your task list is empty. Add a task to get started!</p>}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
