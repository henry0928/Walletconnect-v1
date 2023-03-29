var express = require('express');
const bodyparser= require('body-parser');
const app = express();
const port = 5001 ;

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    //if ( req.body.signature )
      //res.send(req.body.signature) ;
    res.send('it is Done!');
})
app.post('/',(req,res)=>{
    console.log('success');
    console.log(req.body);
});

app.get('/henry', (req, res) => {
    console.log(req.body.signature) ;
    res.send('fuckyou!');
})

app.listen(port, () => {
    console.log('example')    
})