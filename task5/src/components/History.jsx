import React from 'react'
import { observer } from 'mobx-react'
import store from 'src/store';
import HistoryItem from './HistoryItem';

function History () {
    const _ref = React.useRef();

    React.useEffect(() => {
        if (_ref && _ref.current) {
            setTimeout(() => {
                _ref.current.scrollTo(0, -(store.history.length * 1000));
            }, 100)
        }
    }, [_ref, store.history.length])

    return (
        <div className="history"/*historyBody/historyContent*/>
            <div ref={_ref} className="body">
                {store.history.map(item => {
                    return <HistoryItem key={item.id} value={item} />
                })}
            </div>
        </div>
    )
}

export default observer(History);