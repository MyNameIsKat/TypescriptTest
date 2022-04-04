import { Request, Response } from "express";
import { client, db } from "../config/config";
import * as iol from "iol-packages"

//crud
const crud = new iol.service(client);

export const retrieve = async (req: Request, res: Response) => {
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

export const create = async (req: Request, res: Response) => {
  try{
    var type = "admin";
    var logChanger = req.payload?.name

    const id = uuidv4();
    req.body.PK = req.header("for-coop-id");
    if(req.headers.type == "application"){ //application
    
      req.body.SK = "application"+id;
      req.body.filterDate = req.body.PK+"application";
      req.body.disbursement = "PENDING";
      req.body.applicationStatus = "PENDING";
      req.body.filterMember = req.body.memberID + "PENDING"; //gsi for member
      const event = logChanger + " applied for a loan"
      type = "member"
      const logs = await log(type, event, "SUCCESSFUL", req.header("for-coop-id"), logChanger, "Member"); 
      
    }else{ //category

      req.body.SK = "category"+id;
      const event = logChanger + " created "+ req.body.loanName +" category"
      const logs = await log(type, event, "SUCCESSFUL", req.header("for-coop-id"), logChanger, "Credit Committee"); 
    }

    req.body.createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
    req.body.updatedAt = moment().format('YYYY-MM-DD hh:mm:ss');
    req.body.updatedBy = logChanger;
    
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