import React from 'react';
import classNames from 'classnames';

function Button(props) {
    const { className, ...rest } = props;

    const classes = classNames('btn', className);

    return (
        <button className={classes} { ...rest }/>
    )
}

export default Button;