import mongoose from 'mongoose';




const useSchema = new mongoose.Schema({
valor: {
    type:Number,
    required: true
},
statuspagamento: {
    type:String,
    required: true
},
datapagamento: {
    type:Date,
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
},

});

 

export default mongoose.model('lancamentoFinanceiro', useSchema);