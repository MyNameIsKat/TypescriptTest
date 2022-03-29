import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
import {ValidateRequest} from './middlewares/requestErrorHandler';
import router from './routers/router';

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req, res) =>{
    res.send('Hello Typescript Loans')
});

app.use('/loans', router);

ValidateRequest(app);

app.listen(port, () =>{
    return console.log(`listening at PORT ${port}`)
})