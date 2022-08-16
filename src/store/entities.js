import { uuid } from '@/helpers/uuid';

export class Todo {
  id = uuid();
  description = "";
  completed = false;

  constructor({ id, description, completed, }) {
    this.id = id ? id : this.id;
    this.description = description || description.length ? description : this.description;
    this.completed = completed ? completed : this.completed;
  }
}