import { Button, Card, Col, Form, Layout, Row, Typography, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import InputText from "../components/InputText";
import { validateCategory } from "../helpers/validation-helper";

const { Content } = Layout;
const { Title } = Typography;

const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState("");
  const [loading, setLoading] = useState(false);
  const createCategory = useCallback(async () => {
    try {
      setLoading(true);

      const { nome } = formValues;

      if (!nome) return;

      const body = {
        nome: nome,
      };

      await axios.post("/categoria", body);

      Modal.success({
        title: "Cadastro realizado com sucesso.",
      });

      navigate("/categoria/new");
    } catch (error) {
      console.warn(error);
      const { response } = error;
      if (response?.status === 400) {
        Modal.error({
          title: response.data.mensagem,
        });
      } else {
        Modal.error({
          title:
            "Não foi possivel cadastrar a categoria, tente novamente mais tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [formValues]);
  const handleInputChange = useCallback(
    (event) => {
      const { name, value, checked } = event.target;

      setFormValues({
        ...formValues,
        [name]: value || checked,
      });
    },
    [formValues]
  );
  return (
    <Content>
      <Row justify="center">
        <Col xs={24} sl={14} md={12} lg={10} xl={8}>
          <Card style={{ margin: 24 }}>
            <div style={{ textAlign: "center" }}></div>
            <Form layout="vertical">
              <Title
                level={3}
                type="secondary"
                style={{ textAlign: "center", marginTop: 8 }}
              >
                Cadastre sua Categoria
              </Title>
              <InputText
                name="nome"
                label="Nome da Categoria"
                size="large"
                onChange={handleInputChange}
                validate={validateCategory}
                disabled={loading}
                required
              />
              <Button
                block
                type="primary"
                size="large"
                onClick={createCategory}
                loading={loading}
              >
                Cadastrar
              </Button>
            </Form>
          </Card>
          <Link
            to="/categoria"
            className="ant-btn ant-btn-link ant-btn-lg ant-btn-block"
          >
            Ver minhas categorias
          </Link>
        </Col>
      </Row>
    </Content>
  );
};

export default CategoryCreatePage;