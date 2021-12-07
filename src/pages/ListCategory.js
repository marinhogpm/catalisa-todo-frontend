import { useEffect, useState } from "react";
import { Layout, Row, Col, Table, Modal, Button } from "antd";
import axios from "axios";

const { Content } = Layout;
const { Column } = Table;

const ListCategory = () => {
  const [categoria, setCategoria] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/categoria");
      setCategoria(response.data);
    } catch (error) {
      console.warn(error);
      Modal.error({
        title:
          "Não foi possível carregar suas categorias, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCategory();
  }, []);

  return (
    <Content>
      <Row gutter={[24, 24]} justify="center">
        <Col span={23}>
          <Table dataSource={categoria} pagination={false} loading={loading}>
            <Column title="Categoria" dataIndex="nome" key="nome" />
            <Column title="Criada em" dataIndex="data_criacao" key="data_criacao" render={(dataCriacao) => {return new Date(dataCriacao).toLocaleString();}}/>
            
          </Table>
        </Col>
      </Row>
    </Content>
  );
};

export default ListCategory;
