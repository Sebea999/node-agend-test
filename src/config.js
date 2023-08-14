// import {config} from 'dotenv';

//config();

const config = require('dotenv').config();

// port node.js 
//export const PORT = process.env.PORT || 3000
const PORT = process.env.PORT || 3000

// database data 
/*export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'admin'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'odonto'
export const DB_PORT = process.env.DB_PORT || 3306*/
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_DATABASE = process.env.DB_DATABASE || 'odonto'
const DB_PORT = process.env.DB_PORT || 3306

module.exports = {
    PORT, 
    DB_USER, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_DATABASE, 
    DB_PORT
};