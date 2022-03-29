
import { Request, Response, NextFunction } from 'express';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import axios from 'axios';

let pems: {[key: string]: any} = {}

class AuthMiddleware {
  poolRegion = process.env.AWS_REGION;
  userPoolId = process.env.poolid;

  constructor() {
    this.setUp()
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth');

    const coop = req.header('for-coop-id');

    //if (!coop) return res.status(401).send("Cooperative ID not found!").end();

    if (!token) return res.status(401).send("Token not found!").end();

    let decodedJwt: any = jwt.decode(token, { complete: true });
    if (decodedJwt === null) {
      res.status(401).send({message: 'null decodedJWT'}).end()
      return
    }
    // console.log({decodedJwt})
    let kid = decodedJwt.header.kid;
    let pem = pems[kid];

    // console.log({pem})
    if (!pem) {
      res.status(401).send({message: "Unauthorized!"}).end()
      return
    }
    
    jwt.verify(token, pem, function (err : any, payload : any) {
      if (err) {
        res.status(401).send({message: "err", err}).end()
        return
      } else {
        req.payload = payload
        next();
      }
    }) 
  }

  async setUp() {
    const URL = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;
    
    try {
      const response = await axios.get(URL);
      if (response.status !== 200) {
        throw 'request not successful'
      }
      const data = await response.data;
      const { keys } = data;
        for (let i = 0; i < keys.length; i++) {
          const key_id = keys[i].kid;
          const modulus = keys[i].n;
          const exponent = keys[i].e;
          const key_type = keys[i].kty;
          const jwk = { kty: key_type, n: modulus, e: exponent };
          const pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        console.log("got PEMS")
    } catch (error) {
      // console.log(error)
      
      console.log('Error! Unable to download JWKs');
      console.log(this.poolRegion)
    }
  }
}

export default AuthMiddleware