import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { db } from 'api/db/db';
import { ValidationError, ServerError } from 'api/error_handling/errorModels';
import { 
  emailRegex,
  addressRegex,
  nameRegex,
  phoneRegex,
  onlyNumbersRegex, 
} from 'api/helpers/regexPatterns';
const router = express.Router();

