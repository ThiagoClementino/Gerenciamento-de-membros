import mongoose from 'mongoose';


const useSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date, 
        default: Date.now()
    }
});
export default mongoose.model('User', useSchema);