import { observer } from 'mobx-react';
import React from 'react';
import store from 'src/store';
import { Button } from 'src/components/Button';

export const History = observer(function History(props) {
    return (
        <div className="hiddenWrapper">
            <div className="modal-wrapper" />
            <div className="modal history">
                <Button onClick={props.onClick}>Закрыть историю</Button>
                {store.history.map((item, index) => {
                    return (
                        <div key={index} className="history-item">
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
    )
})