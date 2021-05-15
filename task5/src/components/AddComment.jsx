import React from 'react';
import { Input, Modal, Form } from 'antd';
import store from 'src/store';
import { observer } from 'mobx-react';


const AddComment = (props) => {
    const { onClose, value } = props;

    const [message, setMessage] = React.useState('');


    function handleChange(evt) {
        setMessage(evt.target.value);            
    }

    function handleOk() {
        store.addComments({
            id: Date.now(),
            taskId: value.id,
            userId: store.selectedUser.id,
            message,
        }).then(() => {
            handleClose();
        })
    }

    function handleClose() {
        setMessage('');
        onClose();
    }

    return (
        <Modal visible title="Добавление комментария" okText="Добавить" cancelText="Отмена" onOk={handleOk} onCancel={handleClose}>
            <Form>
                <Form.Item label="Message">
                    <Input.TextArea placeholder="Введите комментарий" value={message} onChange={handleChange}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default observer(AddComment);