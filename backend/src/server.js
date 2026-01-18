import express from 'express'
import dotenv from 'dotenv';
import rfpRoutes from './routes/rfp.routes.js'
import vendorsRoutes from './routes/vendors.routes.js'


dotenv.config();

const PORT = process.env.PORT || 5000


const app = express();
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true }));


app.use("/api/rfp",rfpRoutes)
app.use("/api/vendors",vendorsRoutes)


app.listen(PORT, ()=>console.log("Server started"));