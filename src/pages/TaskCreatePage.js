import { Button, Card, Col, Form, Layout, Row, Typography, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import InputText from "../components/InputText";
import { validateTask } from "../helpers/validation-helper";

const { Content } = Layout;
const { Title } = Typography;

const TaskCreatePage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState("");
  const [loading, setLoading] = useState(false);

  const createTask = useCallback(async () => {
    try {
      setLoading(true);

      const { titulo, concluida, categoria_id } = formValues;

      if (!titulo || !categoria_id) return;

      const body = {
        titulo: titulo,
        concluida: concluida,
        categoria_id: categoria_id,
      };

      await axios.post("/tarefas", body);

      Modal.success({
        title: "Cadastro realizado com sucesso.",
      });

      navigate("/tasks/new");
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
            "Não foi possivel cadastrar a tarefa, tente novamente mais tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [formValues, navigate]);

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

            <Title
              level={3}
              type="secondary"
              style={{ textAlign: "center", marginTop: 8 }}
            >
              Cadastre sua Tarefa
            </Title>

            <Form layout="vertical">
              <InputText
                name="titulo"
                label="Titulo"
                size="large"
                onChange={handleInputChange}
                validate={validateTask}
                disabled={loading}
                required
              />
              <InputText
                name="categoria_id"
                label="ID da Categoria"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
              />
              <InputText
                name="concluida"
                label="Concluida"
                type="checkbox"
                size="large"
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <Button
                block
                type="primary"
                size="large"
                onClick={createTask}
                loading={loading}
              >
                Cadastrar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default TaskCreatePage;