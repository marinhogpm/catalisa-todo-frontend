import { Layout, Row, Col, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const { Content } = Layout
const { Column } = Table

const TaskListPage = () => {
    const [tasks,setTasks] = useState([])
    const requestTask = async () =>{
        try{
            const response = await axios.get('/tarefas')
            setTasks(response.data)
            console.log(response.data)
        }catch (error){
            console.warn(error);
        }
        };
    useEffect(() => {
        requestTask();
    }, []);

    return (
        <Content>
            <Row gutter={[24, 24]} justify="center">
                <Col span={23}>
                    <Table
                        dataSource={tasks}
                        pagination={false}>
                        < Column
                            title="ID"
                            dataIndex="id"
                            key="id"
                        />
                        < Column
                            title="Titulo"
                            dataIndex="titulo"
                            key="titulo"
                        />
                        < Column
                            title="Criado em"
                            dataIndex="data_criacao"
                            key="data_criacao"
                            render={dataCriacao =>{
                                return new Date(dataCriacao).toLocaleString();
                            }}
                        />
                        < Column
                            title="Concluida"
                            dataIndex="concluida"
                            key="concluida"
                            render={concluida =>{
                                return concluida ? '✔' : '❌'
                            }}
                        />
                    </Table>
                </Col>
            </Row>
        </Content>
    );
}
export default TaskListPage;