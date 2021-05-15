import React from 'react';

export function Rank(props) {
    const { value } = props;

    function getRank() {
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
        <div className={`rank ${getRank()}`}>
            <div className="rank-dot" />
            {value}
        </div>
    )
}
