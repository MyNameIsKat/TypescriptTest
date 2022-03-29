import { Request, Response } from "express";
import { client, db } from "../config/config";
import * as iol from "iol-packages"

//crud
const crud = new iol.service(client);

export const create = async (req: Request, res: Response) => {
  try{

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
        ":PK": req.params.PK,
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