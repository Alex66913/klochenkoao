import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

function User (props) {
    const { value, inHistory } = props;

    const classes = classNames('profile', inHistory && '-history');

    return (
        <div className={classes}>
            <img className="profile-image" src={value && value.avatar}/>
        </div>
    )
}

export default observer(User);