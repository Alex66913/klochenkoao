import React from 'react';

export function Status(props) {
    const { value } = props;

    function getClass() {
        switch(value.toLowerCase()) {
            case 'pending':
                return 'pending';
            case 'cancelled':
                return 'cancelled';
            case 'completed':
                return 'completed';
            case 'in-progress':
                return 'in-progress';
            default:
                return '';
        }
    }

    return (
        <div className={`status ${getClass()}`}>
            {value}
        </div>
    )
}
