import mongoose from 'mongoose';

const financeiroSchema = new mongoose.Schema({
tipodedado:{
    type: String,
    required: true
},    
valor: {
    type:Number,
    required: true
},
statuspagamento: {
    type:String,
    required: true
},
datapagamento: {
    type:String,
    required: true
},
tipolancamento: {
    type: String,
    required: true
},
comprovante: {
    type: String,
    required: true
},
observacao: {
    type:String,
    required: true
}


});

 

export default mongoose.model('financeiro', financeiroSchema);