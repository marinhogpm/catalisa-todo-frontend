import { useEffect, useState } from 'react';
import { Layout, Row, Col, Table, Modal, Button } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Column } = Table;

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const requestTasks = async () => {
        try {
            setLoading(true);

            const response = await axios.get('/tarefas');
            setTasks(response.data);

        } catch (error) {
            console.warn(error);
            Modal.error({
                title: 'Não foi possível carregar suas tarefas, tente novamente mais tarde.'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        requestTasks();
    }, []);

    const completeTask = async (taskId) => {
        try {
            setLoading(true);

            await axios.put('/tarefas/' + taskId + '/conclusao');

            await requestTasks();
        } catch (error) {
            console.warn(error);
            Modal.error({
                title: 'Não foi possível concluir a tarefa, tente novamente mais tarde.'
            });
        } finally {
            setLoading(false);
        }
    };

    const renderCompleteTask = (concluida, task) => {
        return (
            <Button
                onClick={() => {
                    completeTask(task.id);
                }}
            >
                {concluida ? '✅' : '❌'}
            </Button>
        );
    };

    return (
        <Content>
            <Row gutter={[24, 24]} justify="center">
                <Col span={23}>

                    <Table
                        dataSource={tasks}
                        pagination={false}
                        loading={loading}
                    >
                        <Column
                            title="ID"
                            dataIndex="id"
                            key="id"
                        />
                        <Column
                            title="Titulo"
                            dataIndex="titulo"
                            key="titulo"
                        /> 
                         <Column
                            title="Categoria"
                            dataIndex={["categoria", "nome"]}
                            key="categoria"
                        /> 
                        <Column
                            title="Criada em"
                            dataIndex="data_criacao"
                            key="data_criacao"
                            render={dataCriacao => {
                                return new Date(dataCriacao).toLocaleString();
                            }}
                        /> 
                      
                        <Column
                            title="Concluída"
                            dataIndex="concluida"
                            key="concluida"
                            render={renderCompleteTask}
                        />
                    </Table>
                </Col>
            </Row>
        </Content>
    );
}

export default TaskListPage;