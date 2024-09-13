import React from 'react'
import { useForm } from 'react-hook-form'
const CreateUser = () => {
    const {register, handleSubmit, formState:{erros}} = useForm();
    const onSubmit = data => console.log(data); 
    console.log(erros);


    
  return (
    <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input 
            type="text"
            placeholder='Digite o seu nome'
            {...register("name", {required: true, maxLength:100})}
            />
            <input 
            type="email"
            placeholder='email@email.com'
            {...register("email", {required: true, maxLength:80})}
             />
             <input 
             type="password"
             placeholder='senha@123'
             {...register("password", {required: true, maxLength:15})}
              />
            <button type="submit">Enviar</button>

            </form>



    </div>
  )
}

export default CreateUser