import { observer } from 'mobx-react';
import React from 'react';
import store from 'src/store';
import { Button } from 'src/components/Button';

export const History = observer(function History(props) {
    return (
        <div className="hiddenWrapper">
            <div className="modal history">
                <Button onClick={props.onClick}>Закрыть историю</Button>
                <div className="history-content">
                    {store.history.length === 0 && (
                        <div>Вы не сделални ни одного действия</div>
                    )}

                    {store.history.map((item, index) => {
                        return (
                            <div key={index} className="history-item">
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
})