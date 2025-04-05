import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { map, Observable, switchMap, filter, EMPTY } from 'rxjs';
import { Task } from '../../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  // ✅ Adiciona uma nova tarefa associada ao usuário autenticado
  async addTask(title: string, completed: boolean, finishTs: any) {
    const authUser = this.auth.currentUser; // Obtém o usuário autenticado
    if (!authUser) throw new Error('Usuário não autenticado');

    const col = collection(this.firestore, 'tasks');
    const createdAt = new Date();
    return addDoc(col, {
      title,
      completed,
      createdAt,
      finishTs,
      userId: authUser.uid, // Associa a tarefa ao usuário autenticado
    });
  }

  // ✅ Obtém as tarefas do usuário autenticado
  getTasks(): Observable<Task[]> {
    return user(this.auth).pipe(
      filter((authUser) => !!authUser), // Filtra usuários autenticados
      switchMap((authUser) => {
        if (!authUser) return EMPTY; // Evita erro ao retornar um Observable vazio

        const col = collection(this.firestore, 'tasks');
        const userTasksQuery = query(col, where('userId', '==', authUser.uid));

        return collectionData(userTasksQuery, { idField: 'id' }) as Observable<
          Task[]
        >;
      })
    );
  }

  // ✅ Atualiza uma tarefa existente
  updateTask(
    id: string,
    newTitle?: string,
    newCompleted?: boolean,
    newFinishTs?: any
  ) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    const updateData: Partial<Task> = {};

    if (newTitle !== undefined) updateData.title = newTitle;
    if (newCompleted !== undefined) updateData.completed = newCompleted;
    if (newFinishTs !== undefined) updateData.finishTs = newFinishTs;

    return updateDoc(taskDoc, updateData);
  }

  // ✅ Exclui uma tarefa
  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc);
  }
  updateTaskStatus(id: string, completed: boolean) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return updateDoc(taskDoc, { completed });
  }
}
