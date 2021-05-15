import React from 'react';
import store from 'src/store';
import { observer } from 'mobx-react';
import { unionBy } from 'lodash';
import User from './User';

function getUserById(id) {
    return store.users.find(u => u.id === id);
}

function UserList(props) {
    const { task } = props;
    
    const usersInTask = [
        getUserById(task.assignId),
        getUserById(task.autorId),
    ].filter(Boolean);

    const usersInTaskComments = store.comments
        .filter(comment => comment.taskId === task.id)
        .map(comment => getUserById(comment.userId))
        .filter(Boolean)

    const uniqUsers = unionBy(usersInTask, usersInTaskComments, 'id');

    return (
        <div className="user-list">
            {uniqUsers.length > 5 ? (
                <>
                    {uniqUsers.slice(0, 4).map(u => <User key={u.id} value={u} />)}
                    <div className="profile -counter">
                        +{uniqUsers.length - 4}
                    </div>
                </>
            ) : (
                <>
                    {uniqUsers.map(u => <User key={u.id} value={u} />)}
                </>
            )}
        </div>
    )
}

export default observer(UserList);
