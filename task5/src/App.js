import React from 'react';
import { observer } from 'mobx-react';
// import API from 'src/api';
import Mark from './components/Mark';
import store from 'src/store';
import Search from 'src/components/Search';
import Tasklist from 'src/components/Tasklist';
import { Plus, Notification } from 'src/components/icons'
import User from './components/User';
import History from './components/History';
import Button from './components/Button'
import AddModal from './components/AddModal';
import Preloader from './components/Preloader';
import { Dropdown, Menu } from 'antd';


export const App = observer(function App() {
    const [shownAdd, setShownAdd] = React.useState(false);

    React.useEffect(()=>{
        store.fetchTasks();
        store.selectUserById();
        store.fetchUsers();
        store.fetchHistory();
        store.fetchComments();
        // API.getAllTasks().then((data)=>{console.log(data)})
    },[])

    function toggleAddModal () {
        setShownAdd(!shownAdd)
    }

    function selectUser(user) {
        return function () {
            store.selectedUser = user;
        }
    }

    const userMenu = (
        <Menu>
            {store.users.map(u => {
                return <Menu.Item key={u.id} onClick={selectUser(u)}>{u.name}</Menu.Item>
            })}
        </Menu>
    )

    return (
        <div className="app">
            
            <div className="desktop">
                <div className="header">
                    <div className="search-container">
                        <Search />
                    </div>

                    <div className="account">
                        <Dropdown placement='bottomRight' overlay={userMenu} trigger={['click']}>
                            <div>
                                <User value={store.selectedUser} />
                            </div>
                        </Dropdown>
                        <div className="notification">
                            <Notification />
                            <div className="notification-dot"></div>
                        </div>

                    </div>
                </div>
                <div className="main"/*можно toDoBody/toDoContent*/>
                    <div className="content-header">
                        <h1 className="title-header">You’ve got <Mark>7 task</Mark> today </h1>
                        <Button className="add-new-task" onClick={toggleAddModal}>
                            <Plus />
                            Add New
                        </Button>
                    </div>
                    <Tasklist value={store.activeTasks} header={'On Hold'}/>
                    <Tasklist value={store.inActiveTasks} header={'Complete'} inactive={true}/>
                </div>
               <History />
            </div>
            {shownAdd && <AddModal onClose={toggleAddModal}/>}
            <Preloader />
        </div>
    )
})