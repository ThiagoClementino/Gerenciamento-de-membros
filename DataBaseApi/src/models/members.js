import mongoose from "mongoose";

const membersSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mothersname:{
        type: String,
        required: true
    },
    fathersname:{
        type: String,
        required: true
    },
    dateBirth:{
        type: Date,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    telone:{
        type: String,
        required: true
    },
    teltwo:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    national:{
        type: String,
        required: true
    },
    natural:{
        type: String,
        required: true
    },
    cep:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    complement:{
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    timeinresidence:{
        type: String,
        required: true
    },
    profession:{
        type: String,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    companywork:{
        type: String,
        required: true
    },
    estadocivil:{
        type: String,
        required: true
    },
    conjuge:{
        type: String,
        required: true
    },
    qtdfilhos:{
        type: String,
        required: true
    },
    nomefilhoum:{
        type: String,
        required: true
    },
    idadefilhoum:{
        type: Number,
        required: true
    },
    nomefilhodois:{
        type: String,
        required: true
    },
    idadefilhodois:{
        type: Number,
        required: true
    },
    nomefilhotres:{
        type: String,
        required: true
    },
    idadefilhotres:{
        type: Number,
        required: true
    },
    nomefilhoquatro:{
        type: String,
        required: true
    },
    idadefilhoquatro:{
        type: Number,
        required: true
    },
    optionprimeirocasamento:{
        type: String,
        required: true
    },
    jobChurch:{
        type: String,
        required: true
    }, 
    casamentocristao:{
        type: String,
        required: true
    },
    parceironaigreja:{
        type: String,
        required: true
    },
    justificativa:{
        type: String,
        required: true
    },
    conversao:{
        type: String,
        required: true
    },
    databatismo:{
        type: Date,
        required: true
    },
    motivosaida:{
        type: String,
        required: true
    },
    lastchurch:{
        type: String,
        required: true
    },
    igrejasquefoimembro:{
        type: String,
        required: true
    },
    dizimista:{
        type: String,
        required: true
    },
    ofertante:{
        type: String,
        required: true
    },
    cargoanterior:{
        type: String,
        required: true
    },
    separadoanterior:{
        type: String,
        required: true
    },
    posicaoanterior:{
        type: String,
        required: true
    },
    atividadeanterior:{
        type: String,
        required: true
    },
    problema:{
        type: String,
        required: true
    },
    discipulo:{
        type: String,
        required: true
    },
    participacaocultos:{
        type: String,
        required: true
    },
    cultosdeoracao:{
        type: String,
        required: true
    },
    aconselhamentopastoral:{
        type: String,
        required: true
    },
    desenvolvimento:{
        type: String,
        required: true
    },
    conviccao:{
        type: String,
        required: true
    },
    definicaoevangelho:{
        type: String,
        required: true
    },
    frutosespirito:{
        type: String,
        required: true
    },
    desenvolvimentodafe:{
        type: String,
        required: true
    },
    pecado:{
        type: String,
        required: true
    },
    conviccaoteologica:{
        type: String,
        required: true
    },
    evangelizar:{
        type: String,
        required: true
    },
    jejuar:{
        type: String,
        required: true
    },
    leiturabiblica:{
        type: String,
        required: true
    },
    livros:{
        type: String,
        required: true
    },
    ultimasconsideracoes:{
        type: String,
        required: true
    }
});

export default mongoose.model('members', membersSchema);