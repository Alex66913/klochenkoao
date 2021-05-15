import axios from 'axios';
import store from 'src/store';

class API {
    request;
    requsetList = [];

    constructor() {
        this.request = axios.create({baseURL: 'http://localhost:3000'});

        this.request.interceptors.request.use((req) => {
            this.requsetList.push(req);

            if (!store.preloader) {
                store.preloader = true;
            }

            return req;
        });

        this.request.interceptors.response.use((res) => {
            this.requsetList.pop()

            if (this.requsetList.length === 0) {
                store.preloader = false;
            }

            return res.data;
        }, (res) => {
            this.requsetList = [];
            store.preloader = false;
            return res
        });
    }

    //task

    getAllTasks() {
        return this.request.get('/tasks')
    }
    searchTasks(query) {
        return this.request.get('/tasks?q='+query)
    }
    getTaskById(id) {
        return this.request.get('/tasks/'+id)
    }
    addTask(data) {
        return this.request.post('/tasks', data)
    }
    changeTask(id, data) {
        return this.request.put('/tasks/'+id, data)
    }
    deleteTask(id) {
        return this.request.delete('/tasks/'+id)
    }

    //users

    getAllUsers() {
        return this.request.get('/users')
    }
    getUsersById(id) {
        return this.request.get('/users/'+id)
    }
    addUser(data) {
        return this.request.post('/users', data)
    }

    //comments

    getAllComments() {
        return this.request.get('/comments')
    }
    addComments(data) {
        return this.request.post('/comments', data)
    }
    changeComments(id, data) {
        return this.request.put('/comments/'+id, data)
    }

    //history

    getAllHistory() {
        return this.request.get('/history')
    }
    addHistory(data) {
        return this.request.post('/history', data)
    }
}
const api = new API();

export default api;

// axios('/tasks', {type: 'GET'}) => Все записи
// axios('/tasks/{id}', {type: 'GET'}) =  Конкретная запись
// axios('/tasks', {type: 'POST'}) =  Добавит запись
// axios('/tasks/{id}', {type: 'PUT'}) =  Изменит запись
// axios('/tasks/{id}', {type: 'DELETE'}) =  Удалит запись