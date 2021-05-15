import React from 'react';
import store from 'src/store';
import { observer } from 'mobx-react';
import { Spin } from 'antd';

function Preloader () {
    return store.preloader ? (
        <div className="preloader">
            <Spin size="large" />
        </div>
    ) : <></>
}

export default observer(Preloader);