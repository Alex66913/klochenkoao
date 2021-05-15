import React from 'react';
import { Input } from 'antd';
import { observer } from 'mobx-react';
import store from 'src/store';

const Search = (props) => {
    function handleSearch(val) {
        store.fetchTasks(val);
    }

    return (
        <Input.Search className='custom-search' placeholder="Search for any training you want " onSearch={handleSearch} bordered={false}/>
    )
};

export default observer(Search);