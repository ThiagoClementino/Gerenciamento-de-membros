import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'Digite um email válido' }),

  password: z.string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .max(20, { message: 'A senha deve ter no máximo 20 caracteres' }),

  remember: z.boolean().optional()
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://api-usuarios-five.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao fazer login');
      }

      // Supondo que a API retorne um token JWT
      localStorage.setItem('token', result.token);

      console.log('Login bem-sucedido:', result);

      navigate('/dashboard'); // Ajuste para a rota desejada após login
      reset();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Erro ao tentar login',
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="d-flex justify-content-center">
          <Card className="shadow p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h3>Gestor de Membros</h3>
              </Card.Title>

              {errors.root && (
                <Alert variant="danger" className="mb-3">
                  {errors.root.message}
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

                <Form.Group className="mb-3" controlId="formGroupRemember">
                  <Form.Check
                    type="checkbox"
                    label="Lembrar de mim"
                    {...register('remember')}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
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
                <small className="text-muted">
                  <Link to="/recuperar-senha" className="text-decoration-none">
                    Esqueceu sua senha?
                  </Link>
                </small>
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Não possui um usuário?{' '}
                  <Link to="/criarusuario" className="text-decoration-none">
                    Clique aqui
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