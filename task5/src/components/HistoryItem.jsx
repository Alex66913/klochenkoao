import React from 'react';
import { observer } from 'mobx-react';
import User from './User';
import store from 'src/store';
import classNames from 'classnames';

function getUser(id) {
    return store.users.find(u => u.id === id);
}

function HistoryItem (props) {
    const { value } = props;

    const user = getUser(value.userId)
    const comment = store.comments.find(c => c.id === value.commentId)

    function getHistoryContent() {
        if (user) {
            return (
                <>
                    <div className="user">{user.name}</div>
                    <div className="message">
                        {value.message}
                        {comment && <><br/>"{comment.message}"</>}
                    </div>
                </>
            )
        } else {
            return (
                <div className="message">
                    {value.message}
                </div>
            )
        }
    }

    const classes = classNames('history-item', !user && 'history-item-system');

    return (
        <div className={classes}>
            <div className="icon-container">
                {user && <User value={user} inHistory={true} />}
                {/* <div className="icon">
                    <div className="icon-image"></div>
                </div> */}
            </div>
            <div className="history-content">
                {getHistoryContent()}
                {/* {user && <div className="user">{user.name}</div>}
                <div className="message">
                    {value.message}
                </div> */}
            </div>    
        </div>
    )
}

export default observer(HistoryItem);