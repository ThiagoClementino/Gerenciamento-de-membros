const express = require ('express');
const router = express.Router();

// rota de consulta
router.get('/user/:id',(req, res)=>{
    const {id} = req.params;
    const {situaltionId} = req.query;
    const {email} = req.query;
    const {name} = req.query;
    return res.json({
        id, 
        name,
        email,
        situaltionId
    })
    
})

// rota para incluir dados
router.post ('/users', (req, res)=>{
   
    var {name, email, situaltionId} = req.body;


    res.json({
        name, email, situaltionId
    });
})


// rota de edição
router.put('/users/:id', (req, res)=>{
    const {id} = req.params;
    const {__id, name, email, situaltionId} = req.body
    res.json({id, __id, name, email, situaltionId});
})

// rota para apagar

router.delete('/users/:id', (req, res)=>{
    const {id} = req.params;
  
    res.json({id});
})

module.exports = router;

