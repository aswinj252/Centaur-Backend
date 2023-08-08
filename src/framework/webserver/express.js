// import express from "express";
// import morgan from 'morgan'
// import cors from 'cors'
// import helmet from "helmet";
// import cookieParser from 'cookie-parser';

// export default function expressConfig(app) {

//     app.use(cors())
//     app.use(morgan('dev'));
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));
//     app.use(helmet({ xssFilter: true }))
//     app.use(cookieParser()); 
 

// }

import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';

export default function expressConfig(app) {
    // CORS configuration
    const corsOptions = {
        origin: 'http://localhost:5173', // Replace this with the actual origin of your frontend application
        credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
    };

    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet({ xssFilter: true }));
    app.use(cookieParser());
}