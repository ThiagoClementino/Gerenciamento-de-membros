const mongoose = require('mongoose');
const db = require('../config/connectDB');

const UserSchema = new mongoose.Schema({
valor: Number,
statuspagamento: String,
datapagamento: Date,
tipolancamento: String,
comprovante: String,
observacao: String,

});
const modelFinanceiro = mongoose.model('lancamento', UserSchema);

module.exports = modelFinanceiro;

