import React from 'react';
import { Input, Modal, Form, Select } from 'antd';
import { observer } from 'mobx-react'
import store from 'src/store';

const AddModal = (props) => {
    const { onClose } = props;

    const [title, setTitle] = React.useState('');
    const [status, setStatus] = React.useState('Pending');
    const [rank, setRank] = React.useState('Средняя');
    const [user, setUser] = React.useState(null);

    function handleChange(prop) {
        return function handler(evt) {
            switch(prop) {
                case 'title': {
                    setTitle(evt.target.value);
                    break;
                }
                case 'status': {
                    setStatus(evt);
                    break;
                }
                case 'rank': {
                    setRank(evt);
                    break;
                }
                case 'user': {
                    setUser(evt);
                    break;
                }
            }
        }
    }

    function handleOk() {
        store.addTask({
            id: Date.now(),
            title,
            status,
            rank,
            autorId: store.selectedUser.id,
            assignId: user 
        }).then(() => {
            handleClose();
        })
    }

    function handleClose() {
        setTitle('');
        setStatus('Pending');
        setRank('Minor');
        setUser(null);
        onClose();
    }

    return (
        <Modal visible title="Добавление таски" okText="Добавить" cancelText="Отмена" onOk={handleOk} onCancel={handleClose}>
            <Form>
                <Form.Item label="Title">
                    <Input value={title} onChange={handleChange('title')}/>
                </Form.Item>
                <Form.Item label="Status">
                    <Select value={status} onChange={handleChange('status')}>
                        <Select.Option value='Pending'>Pending</Select.Option>
                        <Select.Option value='in-progress'>InProgress</Select.Option>
                        <Select.Option value='completed'>Complete</Select.Option>
                        <Select.Option value='cancelled'>Cancelled</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Rank">
                    <Select value={rank} onChange={handleChange('rank')}>
                        <Select.Option value='Низкая'>Низкая</Select.Option>
                        <Select.Option value='Средняя'>Средняя</Select.Option>
                        <Select.Option value='Высокая'>Высокая</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Assigne">
                    <Select value={user} onChange={handleChange('user')}>
                        {store.users.map(u => {
                            return (
                                <Select.Option key={u.id} value={u.id}>{u.name}</Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default AddModal;