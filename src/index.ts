import express from "express";
import cors from 'cors';
import eventRoute from "./routes/eventRoute";
import categoryRoute from "./routes/categoryRoute";
import pembicaraRoute from "./routes/pembicaraRoute";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();  

const app=express();
const port=3000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello,world!");
});

app.use("/events",eventRoute);
app.use("/categories", categoryRoute);
app.use("/pembicara", pembicaraRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/dashboard", async (req, res) => {

    try {

        const totalEvent = await prisma.event.count();

        const totalCategory = await prisma.category.count();

        const totalPembicara = await prisma.pembicara.count();

        res.json({
            events: totalEvent,
            categories: totalCategory,
            pembicara: totalPembicara
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Terjadi Error"
        });

    }

});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});