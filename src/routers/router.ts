import * as express from 'express';
const router = express.Router();

//refer to the controllers
import * as controller from  "../controllers/controller"

//refer to the middleware
import {validator, schemaTest} from "../middlewares/validateReqLoans"

//Create
router.post("/create", validator.body(schemaTest), controller.create)

//Create
router.get("/retrieve/:PK/:SK", controller.retrieve)

//Create
router.put("/update", validator.body(schemaTest), controller.update)

//Create
router.delete("/delete", validator.body(schemaTest), controller.del)

export default router;