import mongoose from 'mongoose';

async function connectDatabase  () {

   await mongoose.connect('mongodb+srv://thidf57:NwNUqHeirjup8qZY@Gerenciador-de-Membros.ua4raq8.mongodb.net/?retryWrites=true&w=majority&appName=Gerenciador-de-Membros')

} 
export default connectDatabase