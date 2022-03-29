import { Request, Response} from "express";
import { client, db } from "../config/config";
import * as iol from "iol-packages";
import {v4 as uuidv4} from "uuid";
//crud
let crud = new iol.service(client);

export const create = async (req: Request, res: Response) => {
  try{
    var type:string = "admin";
    var logChanger:string = req.payload?.name;
    var event:string = "";
    const id = uuidv4();
    req.body.PK = req.header("for-coop-id");

    if(req.headers.type == "application"){
        req.body.SK = "application"+id;
        req.body.filterDate = req.body.PK+"application";
        req.body.disbursement = "PENDING";
        req.body.applicationStatus = "PENDING";
        req.body.filterMember = req.body.memberID + "PENDING"; //gsi for member
        event = logChanger + " applied for a loan"
        type = "member"
    }else{
        req.body.SK = "category"+id;
        event = logChanger + " created " + req.body.loanName + " category"
    }

    

    const params = {
      TableName: db,
      Item: req.body
    }
  
    await crud.create(params);
    res.send(iol.returnResponse(201, "Succesfully Created", params.Item));

  }catch(err){
    res.status(500).send(err);
  }
  
}

export const getBySKperCoop = async (req: Request, res: Response) => {
  try{

    const params = {
      TableName : db,
      KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
      ExpressionAttributeNames:{
        "#PK": "PK",
        "#SK": "SK"
      },
      ExpressionAttributeValues: {
        ":PK": req.header("for-coop-id"),
        ":SK": req.params.SK
      }
    }
  
    const result = await crud.fetch(params);
    res.send(iol.returnResponse(201, "Succesfully Retrieved", result));

  }catch(err){
    res.status(500).send(err);
  }
}

export const update = async (req: Request, res: Response) => {
  try{

    const {UpdateExpression, ExpressionAttributeValues} = iol.updateHandler(req.body);
    const params = {
      TableName : db,
      Key:{
        "PK": req.body.PK,
        "SK": req.body.SK
      },
      ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
      UpdateExpression: 'SET ' + UpdateExpression,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }
  
    const result = await crud.update(params);
    res.send(iol.returnResponse(201, "Succesfully Updated", result));

  }catch(err){
    res.status(500).send(err);
  }
}

export const del = async (req: Request, res: Response) => {
  try{

    const params = {
      TableName: db,
      Key:{
        "PK": req.body.PK,
        "SK": req.body.SK
      },
      ReturnValues: 'ALL_OLD'
    }
  
    const result = await crud.delete(params);
    res.send(iol.returnResponse(201, "Succesfully Delete", result));

  }catch(err){
    res.status(500).send(err);
  }
  
}