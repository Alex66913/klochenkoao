import React from 'react';
import ListItem from './ListItem';
import className from 'classnames';
import { observer } from 'mobx-react';

function Tasklist (props) {
const { value, header, inactive } = props;

    const classess = className('list', inactive && 'inactive');

return (
    <div className={classess}>
        <div className='list-header'>
            {header}
        </div>
        <div className='list-wrapper'>
            {value.map(function(item) {
                return <ListItem key={item.id} value={item}/>
            }) }
        </div>
    </div>
    )
} 

export default observer(Tasklist);