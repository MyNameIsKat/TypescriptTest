import * as express from 'express';
const router = express.Router();

//refer to the controllers
import * as controller from  "../controllers/controller"

//refer to the middleware
import {validator, schemaTest} from "../middlewares/validateReqLoans"

//auth
import { auth } from "../middlewares/auth";

//Create
router.post("/create", auth.verifyToken, validator.body(schemaTest), controller.create)

//Get
router.get("/retrieve/:PK", auth.verifyToken, controller.getBySKperCoop)

//Update
router.put("/update", auth.verifyToken, validator.body(schemaTest), controller.update)

//Delete
router.delete("/delete", auth.verifyToken, validator.body(schemaTest), controller.del)

export default router;