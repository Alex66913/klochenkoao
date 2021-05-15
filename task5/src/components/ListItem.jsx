import React from 'react';
import { Status } from './Status';
import { Rank } from './Rank';
import { observer } from 'mobx-react'; 
import { Menu, Dropdown } from 'antd';
import { Dots } from './icons';
import store from 'src/store';
import ChangeModal from './ChangeModal';
import AddComment from './AddComment';
import UserList from './UserList';

function ListItem (props) {
    const { value } = props;

    const [shownChange, setShownChange] = React.useState(false);
    const [shownAddComment, setShownAddComment] = React.useState(false);

    function handleToggleChange() {
      setShownChange(!shownChange)
    }
    function handleToggleAddComment() {
      setShownAddComment(!shownAddComment)
    }
    function handleDelete() {
      store.deleteTask(value.id)
      // store.changeTask(value.id, {
      //   ...value,
      //   status: 'Cancelled'
      // })
    }

    const menu = (
        <Menu>
        <Menu.Item onClick={handleToggleAddComment}>
          Оставить комментарий
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleToggleChange}>
          Изменить
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleDelete} danger={true}>
          Удалить
        </Menu.Item>
      </Menu>
    );


    return (
        <div className="list-item">
          <div className="dot-col">
            <div className="dot">
                <div className="dot-in"></div>
            </div>
          </div>
            <p className="title">{value.title}</p>
            <div className="state"><Status value={value.status}/></div>
            <div className="rank-col"><Rank value={value.rank}/></div> 
                
                
                {/* <div className="rank-dot">
                  <Rankdot value={value.rank}/></div>
                */}
            <div className="users">
              <UserList task={value}/>
            </div>
            <div className="action-col">
              <Dropdown overlay={menu} trigger={['click']}>
                  <div className="action"><Dots /></div>
              </Dropdown>
            </div>
            {shownChange && <ChangeModal value={value} onClose={handleToggleChange}/>}
            {shownAddComment && <AddComment value={value} onClose={handleToggleAddComment}/>}
        </div>
    )
}

export default observer(ListItem)