import { Layout, Row, Col, Table } from "antd";

const { Content } = Layout
const { Column } = Table

const TASKS = [
    {
        "id": 2,
        "titulo": "Lavar o carro",
        "data_criacao": 1637009232863,
        "concluida": 0,
        "usuario_id": 1
    },
    {
        "id": 3,
        "titulo": "Arrumar a casa",
        "data_criacao": 1637009243918,
        "concluida": 0,
        "usuario_id": 1
    },
    {
        "id": 4,
        "titulo": "Estudar para a prova",
        "data_criacao": 1637009251042,
        "concluida": 1,
        "usuario_id": 1
    },
];


const TaskListPage = () => {
    return (
        <Content>
            <Row gutter={[24, 24]} justify="center">
                <Col span={23}>
                    <Table
                        dataSource={TASKS}
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