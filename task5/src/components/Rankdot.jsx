import React from 'react';

export function Rankdot(props) {
    const { value } = props;

    function getDot() {
        switch(value.toLowerCase()) {
            case 'низкая':
                return 'minor';
            case 'средняя':
                return 'normal';
            case 'высокая':
                return 'critical';
            default:
                return '';
        }
    }
    return (
        <div className={`rank-dot ${getDot()}`}></div>
    )
}