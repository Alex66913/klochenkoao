import classNames from 'classnames';
import React from 'react';

export function Bar(props) {
    
    const classes = classNames('bar', props.type && `bar-${props.type}`);

    return (
        <div className={classes}>
            <div className="progress" style={{ width: props.value + '%' }}/>
        </div>
        // <input className={classes} type="range" value={props.value} min={0} max={100}/>
    )
}