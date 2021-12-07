import { Button, Card,  Col, Form, Layout, Row, Typography, Modal} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import axios from 'axios';
import InputText from '../components/InputText';
import { validateCategoriaId, validateEmail, validateName, validatePassword, validateTask } from '../helpers/validation-helper';

const { Content } = Layout;
const { Title } = Typography;


const TaskCreatePage = () => {
    const navigate = useNavigate();        
    const [formValues, setFormValues] = useState("")
    const [loading, setLoading] = useState(false);
  
    const createTask = useCallback(async () => {
      try {
        setLoading(true);
  
        const { titulo, concluida, categoria_id } = formValues;
  
        if (!titulo || !concluida || !categoria_id) return;
  
        const body = {
          titulo: titulo,
          concluida: concluida,
          categoria_id: categoria_id,
        }
  
        await axios.post('/tarefas', body);
        
        Modal.success({
          title: 'Cadastro realizado com sucesso, efetue login para continuar.',
        })
  
        navigate('/tarefas');
      } catch (error) {
        console.warn(error);
        const { response } = error;
        if (response?.status === 400) {
          Modal.error({
            title: response.data.mensagem
          });
        } else {
          Modal.error({
            title: 'Não foi cadastrar-se, tente novamente mais tarde.'
          })
        }
      } finally {
        setLoading(false);
      }
    }, [formValues, navigate]);
  
    const handleInputChange = useCallback((event) => {
      const { name, value } = event.target;
  
      setFormValues({
        ...formValues,
        [name]: value,
      })
    }, [formValues]);

    return (
        <Content>
          <Row
            justify="center"
          >
            <Col xs={24} sl={14} md={12} lg={10} xl={8}>
              <Card style={{ margin: 24 }}>
                <div style={{ textAlign: 'center' }}>
                </div>
    
                <Title
                  level={3}
                  type="secondary"
                  style={{ textAlign: 'center', marginTop: 8 }}
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
                    name="concluida"
                    label="Concluida"
                    size="large"
                    onChange={handleInputChange}
                    disabled={loading}
                    required
                  />
    
                  <InputText
                    name="categoria_id"
                    label="ID da Categoria"
                    size="large"
                    onChange={handleInputChange}
                    validate={validateCategoriaId}
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
    
                  <Link to="/tasks" className="ant-btn ant-btn-link ant-btn-lg ant-btn-block">
                    Ver minhas tarefas
                  </Link>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
      );
}

export default TaskCreatePage;