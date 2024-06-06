const mongoose = require('mongoose');
const { Schema } = mongoose;



const UserSchema = new Schema({
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

const dataFinanceiro = mongoose.model('dataFinanceiro', UserSchema);

module.exports = dataFinanceiro;