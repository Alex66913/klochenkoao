import React from 'react';
import classNames from 'classnames';

export function Button(props) {
    function handleClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

    const classes = classNames('btn', props.type && `btn-${props.type}`);

    return (
        <button className={classes} onClick={handleClick}>
            {props.children}
        </button>
    )
}