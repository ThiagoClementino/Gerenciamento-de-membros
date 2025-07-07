import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputMask } from '@react-input/mask';

import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

// ✅ Schema com validação Zod corrigida
const createUserSchema = z.object({
  name: z.string()
    .min(2, { message: 'Digite o nome completo' })
    .max(100, { message: 'Nome muito longo' }),

  phone: z.string()
    .min(15, { message: 'Telefone inválido' }) // máscara (99) 99999-9999 = 15 caracteres
    .max(15, { message: 'Telefone inválido' }),

  email: z.string()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'Digite um email válido' }),

  password: z.string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .max(15, { message: 'A senha deve ter no máximo 15 caracteres' }),

  confirmPassword: z.string()
    .min(1, { message: 'Confirme sua senha' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const CreateUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // ✅ Função onSubmit corrigida com múltiplas tentativas de formato de API
  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      // Remove a máscara do telefone antes de enviar
      const phoneRaw = data.phone.replace(/\D/g, '');
      
      // ✅ Primeiro, tenta com o formato completo (mais provável)
      let finalData = {
        name: data.name,
        phone: phoneRaw,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword // Adicionado confirmPassword
      };

      console.log('🔍 Tentativa 1 - Dados completos para envio:', finalData);

      let response = await fetch('https://api-users-omega.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      // Se der erro 400, tenta apenas com email e password (formato original)
      if (response.status === 400) {
        console.log('⚠️ Erro 400 com dados completos, tentando apenas email/password...');
        
        finalData = {
          email: data.email,
          password: data.password
        };

        console.log('🔍 Tentativa 2 - Apenas email/password:', finalData);

        response = await fetch('https://api-users-omega.vercel.app/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        });
      }

      // Se ainda der erro 400, tenta com username ao invés de name
      if (response.status === 400) {
        console.log('⚠️ Ainda erro 400, tentando com "username" ao invés de "name"...');
        
        finalData = {
          username: data.name,
          phone: phoneRaw,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword // Adicionado confirmPassword
        };

        console.log('🔍 Tentativa 3 - Com username:', finalData);
        //https://api-users-omega.vercel.app/api/auth/
        response = await fetch('http://localhost:5000/api/auth/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        // ✅ Melhor tratamento de erro com detalhes da API
        const errorMessage = result.message || result.error || `Erro ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // ✅ Sucesso - feedback para o usuário
      setSuccessMessage('Usuário cadastrado com sucesso!');
      
      // Se a API retornar um token, armazena no localStorage
      if (result.token) {
        localStorage.setItem('token', result.token);
      }

      console.log('✅ Cadastro bem-sucedido:', result);

      // Limpa o formulário
      reset();

      // Redireciona após 2 segundos para o usuário ver a mensagem de sucesso
      setTimeout(() => {
        navigate('/dashboard'); // Ajuste para a rota desejada após cadastro
      }, 2000);

    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      
      // ✅ Tratamento de erro melhorado com mais detalhes
      let errorMessage = 'Erro ao tentar cadastrar usuário';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      // Tratamento específico para diferentes tipos de erro
      if (error.message?.includes('email')) {
        setError('email', {
          type: 'manual',
          message: 'Este email já está em uso ou é inválido',
        });
        errorMessage = 'Problema com o email fornecido';
      } else if (error.message?.includes('password')) {
        setError('password', {
          type: 'manual',
          message: 'Senha não atende aos critérios da API',
        });
        errorMessage = 'Problema com a senha fornecida';
      }
      
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="d-flex justify-content-center">
          <Card>
            <Card.Body>
              <Card.Title className="mb-4 text-center">Cadastrar Usuário</Card.Title>

              {/* ✅ Feedback visual para o usuário */}
              {apiError && (
                <Alert variant="danger" className="mb-3">
                  <strong>Erro:</strong> {apiError}
                  <br />
                  <small>Verifique os dados e tente novamente.</small>
                </Alert>
              )}

              {successMessage && (
                <Alert variant="success" className="mb-3">
                  <strong>Sucesso!</strong> {successMessage}
                  <br />
                  <small>Redirecionando...</small>
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Nome */}
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu nome completo"
                    {...register('name')}
                    isInvalid={!!errors.name}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Telefone com máscara */}
                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <InputMask
                        mask="(99) 99999-9999"
                        replacement={{ 9: /\d/ }}
                        {...field}
                        component={Form.Control}
                        type="tel"
                        placeholder="(61) 99999-9999"
                        isInvalid={!!errors.phone}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@exemplo.com"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Senha */}
                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite uma senha segura"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Mínimo 6 caracteres.
                  </Form.Text>
                </Form.Group>

                {/* ✅ Confirmação de Senha */}
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* ✅ Botão com estado de loading */}
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Cadastrando...
                    </>
                  ) : (
                    'Cadastrar'
                  )}
                </Button>
              </Form>

              {/* Link para login */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  Já tem uma conta?{' '}
                  <Button 
                    variant="link" 
                    className="p-0" 
                    onClick={() => navigate('/login')}
                    disabled={isLoading}
                  >
                    Faça login
                  </Button>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;


