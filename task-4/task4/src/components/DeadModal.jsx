import { observer } from 'mobx-react';
import React from 'react';
import store from 'src/store';
import { Button } from 'src/components/Button';

export const DeadModal = observer(function DeadModal(props) {
    const handleClick = () => {
        store.restart();
    }

    return (
        <div className="hiddenWrapper">
            <div className="modal-wrapper" />
            <div className="modal dead">
                <p>Жека умер</p>
                <Button onClick={handleClick}>Да здравствует новый Жека</Button>
            </div>
        </div>
    )
})