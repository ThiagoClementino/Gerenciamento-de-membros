import React from 'react'
import { useForm } from 'react-hook-form'
import {ZodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object ({
  email:z.string()
  .min(1, {message: 'O e-mail é obrigatório'})
  .email({message:'Digite um email válido'}),
  
  password: z.string()
  .min(6, {message: 'A senha deve ter no mínimo 6 caractéres'})
  .max(20, {message:'A senha deve ter no máximo 20 caractéres'}),
  remember:z.boolean() .optionnal()
})

const Login = () => {

  const {
    register,
    handleSubmit,
    formState:{erros, isSubmitting},
    reset,
    setError
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email:'',
      password: '',
      remember:false
    }
  });
    const onSubmit = async (data) => {
    try {
      // Simulando uma chamada API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no login');
      }

      // Login bem-sucedido - redirecionar ou atualizar estado
      console.log('Login bem-sucedido:', data);
      reset();
      
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Ocorreu um erro durante o login'
      });
    }
  };

  return (
    <div>Login</div>
  )
}

export default Login