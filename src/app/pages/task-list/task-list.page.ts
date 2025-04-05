import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { Task } from '../../../utils/interfaces';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: false,
})
export class TaskListPage {
  tasks: Observable<Task[]>;
  showForm: boolean = false;
  newTaskTitle: string = '';
  finishTs: string = '';
  editingTask: Task | null = null; // Indica se está editando uma tarefa

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  resetForm() {
    this.newTaskTitle = '';
    this.finishTs = '';
    this.editingTask = null;
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      if (this.editingTask) {
        this.taskService.updateTask(
          this.editingTask.id,
          this.newTaskTitle,
          this.editingTask.completed,
          this.finishTs
        );
      } else {
        this.taskService.addTask(this.newTaskTitle, false, this.finishTs);
      }
      this.toggleForm();
    }
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.newTaskTitle = task.title;
    this.finishTs = task.finishTs;
    this.showForm = true;
  }

  formatDate(finishTs: string): Date {
    return new Date(finishTs.replace(/_/g, '-')); // Ajusta o formato e converte para Date
  }

  formatDisplayDate(finishTs: string): string {
    const data = this.formatDate(finishTs);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

  getTaskClass(task: Task): string {
    if (task.completed) return 'task-completa'; // Azul ✅

    const hoje = new Date();
    const prazo = this.formatDate(task.finishTs);
    const hojeSemHora = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );
    const prazoSemHora = new Date(
      prazo.getFullYear(),
      prazo.getMonth(),
      prazo.getDate()
    );
    const diffDias =
      (prazoSemHora.getTime() - hojeSemHora.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDias < 0) return 'task-expirada'; // Vermelho 🔴
    if (diffDias === 0) return 'task-hoje'; // Laranja 🟠
    if (diffDias >= 1) return 'task-amanha'; // Verde 🟢

    return '';
  }

  sortTasks(tasks: Task[] | null): Task[] {
    if (!tasks) return []; // Se tasks for null, retorna um array vazio
    return tasks.sort(
      (a, b) =>
        this.formatDate(a.finishTs).getTime() -
        this.formatDate(b.finishTs).getTime()
    );
  }
  toggleTaskStatus(task: Task, completed: boolean) {
    task.completed = completed; // Atualiza localmente
    this.taskService
      .updateTaskStatus(task.id, completed) // Atualiza no Firebase
      .catch((err) => console.error('Erro ao atualizar status:', err));
  }
}
