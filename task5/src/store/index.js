import { makeAutoObservable } from 'mobx';
import API from 'src/api';

export class Store {
    preloader = false;
    tasks = [];
    selectedTask = null;

    users = [];
    selectedUser = null;

    comments = [];

    history = [];

    constructor() {
        makeAutoObservable(this);
    }

    get activeTasks() {
        return this.tasks.filter (function(item) {
            return item.status.toLowerCase() !== "cancelled" && item.status.toLowerCase() !== "completed"
        })  
    }

    get inActiveTasks() {
        return this.tasks.filter (function(item) {
            return item.status.toLowerCase() === "cancelled" || item.status.toLowerCase() === "completed"
        })
    }

    //tasks

    async fetchTasks(query) {
        if (query) {
            this.tasks = await API.searchTasks(query)
        } else {
            this.tasks = await API.getAllTasks()
        }

    }
    async selectTaskById(id) {
        this.selectedTask = await API.getTaskById(id)
    }
    async addTask(data) {
        await API.addTask(data)
        await this.fetchTasks()
        await this.addHistory({
            id: Date.now(),
            taskId: data.id,
            commentId: null,
            userId: this.selectedUser.id,
            message: "Задание создано"
        })
    }
    async changeTask(id, data) {
        this.selectedTask = await API.changeTask(id, data)
        await this.fetchTasks()
        await this.addHistory({
            id: Date.now(),
            taskId: id,
            commentId: null,
            userId: this.selectedUser.id,
            message: "Задание изменено"
        })
    }

    async deleteTask(id) {
        await API.changeTask(id, {
            ...this.tasks.find(t => t.id === id),
            status: 'Cancelled',
        })
        await this.fetchTasks()
        await this.addHistory({
            id: Date.now(),
            taskId: id,
            commentId: null,
            userId: this.selectedUser.id,
            message: "Задание удалено"
        })
    }

    //users

    async fetchUsers() {
        this.users = await API.getAllUsers()
    }
    async selectUserById(id = 0) {
        this.selectedUser = await API.getUsersById(id)
    }
    async addUser(data) {
        await API.addUser(data)
        await this.fetchUsers()
    }

    //comments

    async fetchComments() {
        this.comments = await API.getAllComments()
    }
    async addComments(data) {
        await API.addComments(data)
        await this.fetchComments()
        await this.addHistory({
            id: Date.now(),
            taskId: data.taskId,
            commentId: data.id,
            userId: data.userId,
            message: 'Добавлен комментарий c текстом:'
        })
    }
    // async changeComments(id, data) {
    //     await API.changeComments(id, data)
    //     await this.fetchComments()
    //     await this.addHistory({
    //         id: Date.now(),
    //         taskId: data.taskId,
    //         commentId: id,
    //         userId: this.selectedUser.id,
    //         message: "Комментарий изменен"
    //     })
    // }

    //history

    async fetchHistory() {
        this.history = await API.getAllHistory()
    }
    async addHistory(data) {
        await API.addHistory(data)
        await this.fetchHistory()
    }
}

const store = new Store();

export default store;