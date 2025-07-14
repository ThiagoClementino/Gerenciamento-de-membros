import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import Swal from 'sweetalert2';

// Esquema de validação (sem alterações)
const loginSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório').email('Digite um email válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

// Serviço de API com a correção na resposta
const apiService = {
  login: async (email, senha) => {
    const API_URL = 'https://api-usuarios-five.vercel.app/api/login';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha } ),
    });

    // Se a resposta não for OK, primeiro tenta ler o JSON do erro
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.error || `Erro ${response.status}`);
    }

    // CORREÇÃO AQUI: A API retorna o token como texto/string puro
    const token = await response.text(); // Usar .text() em vez de .json()
    if (!token) {
      throw new Error('A API retornou uma resposta vazia em vez de um token.');
    }
    
    return token; // Retorna a string do token diretamente
  }
};

// Componente de Login com a correção no tratamento do resultado
const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
    
      const token = await apiService.login(data.email, data.password);

      localStorage.setItem('token', token); 
      console.log('Login bem-sucedido! Token recebido.');
      Swal.fire({
        icon: 'success', // Ícone de sucesso
        title: 'Logado com sucesso!',
        text: 'Você será redirecionado em breve.',
        showConfirmButton: false, // Esconde o botão de "OK"
        timer: 2000, // Tempo em milissegundos antes de fechar automaticamente
        position: 'center', // Centraliza a notificação
        timerProgressBar: true, // Mostra uma barra de progresso do timer
        didOpen: () => {
          Swal.showLoading(); // Mostra um ícone de carregamento sutil
        }
      });
      setTimeout(()=>{

        navigate('/dashboard');
      },2500);
    } catch (error) {
      console.error("Falha no login:", error);
      setServerError(error.message || 'Não foi possível conectar ao servidor.');
    }
  };

  // ... O resto do seu JSX (return) permanece o mesmo ...
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="d-flex justify-content-center">
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="mb-4 text-center h3">
                <h3>Gestor de Membros</h3>
              </Card.Title>

              {serverError && (
                <Alert variant="danger" className="mb-3">
                  {serverError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@exemplo.com"
                    {...register('email')}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    {...register('password')}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <small>
                  <Link to="/recuperar-senha" className="text-muted text-decoration-none">
                    Esqueceu sua senha?
                  </Link>
                </small>
              </div>

              <hr />

              <div className="text-center">
                <small className="text-muted">
                  Não possui um usuário?{' '}
                  <Link to="/criarusuario" className="text-decoration-none fw-bold">
                    Cadastre-se
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
