import mongoose from "mongoose";

const membersSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
    sparse: true,
    autoIndex: true,
  },
  datacriacao: {
    type: Date,
    default: Date.now(),
  },

  name: {
    type: String,
    required: false,
  },
  mothersname: {
    type: String,
    required: false,
  },
  fathersname: {
    type: String,
    required: false,
  },
  dateBirth: {
    type: Date,
    required: false,
  },
  sex: {
    type: String,
    required: false,
  },
  telone: {
    type: String,
    required: false,
  },
  teltwo: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: false,
  },
  national: {
    type: String,
    required: false,
  },
  natural: {
    type: String,
    required: false,
  },
  cep: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  number: {
    type: Number,
    required: false,
  },
  complement: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  timeinresidence: {
    type: String,
    required: false,
  },
  profession: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  companywork: {
    type: String,
    required: false,
  },
  estadocivil: {
    type: String,
    required: false,
  },
  conjuge: {
    type: String,
    required: false,
  },
  qtdfilhos: {
    type: Number,
    required: false,
  },
  nomefilhoum: {
    type: String,
    required: false,
  },
  idadefilhoum: {
    type: Number,
    required: false,
  },
  nomefilhodois: {
    type: String,
    required: false,
  },
  idadefilhodois: {
    type: Number,
    required: false,
  },
  nomefilhotres: {
    type: String,
    required: false,
  },
  idadefilhotres: {
    type: Number,
    required: false,
  },
  nomefilhoquatro: {
    type: String,
    required: false,
  },
  idadefilhoquatro: {
    type: Number,
    required: false,
  },
  optionprimeirocasamento: {
    type: String,
    required: false,
  },
  jobChurch: {
    type: String,
    required: false,
  },
  casamentocristao: {
    type: String,
    required: false,
  },
  parceironaigreja: {
    type: String,
    required: false,
  },
  justificativa: {
    type: String,
    required: false,
  },
  dataconversao: {
    type: Date,
    required: false,
  },
  databatismo: {
    type: Date,
    required: false,
  },
  motivosaida: {
    type: String,
    required: false,
  },
  lastchurch: {
    type: String,
    required: false,
  },
  igrejasquefoimembro: {
    type: String,
    required: false,
  },
  dizimista: {
    type: String,
    required: false,
  },
  ofertante: {
    type: String,
    required: false,
  },
  cargoanterior: {
    type: String,
    required: false,
  },
  separadoanterior: {
    type: String,
    required: false,
  },
  posicaoanterior: {
    type: String,
    required: false,
  },
  atividadeanterior: {
    type: String,
    required: false,
  },
  problema: {
    type: String,
    required: false,
  },
  discipulo: {
    type: String,
    required: false,
  },
  participacaocultos: {
    type: String,
    required: false,
  },
  cultosdeoracao: {
    type: String,
    required: false,
  },
  aconselhamentopastoral: {
    type: String,
    required: false,
  },
  desenvolvimento: {
    type: String,
    required: false,
  },
  conviccao: {
    type: String,
    required: false,
  },
  definicaoevangelho: {
    type: String,
    required: false,
  },
  frutosespirito: {
    type: String,
    required: false,
  },
  desenvolvimentodafe: {
    type: String,
    required: false,
  },
  pecado: {
    type: String,
    required: false,
  },
  conviccaoteologica: {
    type: String,
    required: false,
  },
  evangelizar: {
    type: String,
    required: false,
  },
  jejuar: {
    type: String,
    required: false,
  },
  leiturabiblica: {
    type: String,
    required: false,
  },
  livros: {
    type: String,
    required: false,
  },
  ultimasconsideracoes: {
    type: String,
    required: false,
  },
});

export default mongoose.model("members", membersSchema);
