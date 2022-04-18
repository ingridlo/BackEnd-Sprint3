const { Router } = require("express");
const router = Router();
const express = require("express");
const conection = require('../DB/db');

// Crear Marca
router.post("/crear/marca", async (req, res) => {     
    try{           
    const { nombre_marca } = req.body;
    if (nombre_marca ===""){
        return res.status(500).send("El nombre de la marca no puede estar vacio")
    }    
    const resultado= await conection.query(`
    INSERT INTO marca (${Object.keys(req.body).join()})
    VALUES(?,?,?);`,Object.values(req.body))      
    return res.json(Object.values(req.body))}
    catch(e){
        if(e.errno === 1062){
            res.status(500).send("La marca ya existe")
        }        
        else if(e.errno === 1265){
            res.status(500).send("El estado solo puede ser S o N")
        }
        else if (e.errno === 1406){
            res.status(500).send("La descripcion es muy larga, máximo 50 caracteres")
        }
        res.status(500).json(e)
    }

  });

// Crear Linea

router.post("/crear/linea", async (req, res) => {     
    try{           
    const { nombre_linea} = req.body;
    if (nombre_linea ===""){
        return res.status(500).send("El nombre de la linea no puede estar vacio")
    }    
    const resultado= await conection.query(`
    INSERT INTO linea (${Object.keys(req.body).join()})
    VALUES(?,?,?,?);`,Object.values(req.body))      
    return res.json(Object.values(req.body))}
    catch(e){
        if(e.errno === 1062){
            res.status(500).send("La linea ya existe")
        }        
        else if(e.errno === 1265){
            res.status(500).send("El estado solo puede ser S o N")
        }
        else if (e.errno === 1406){
            res.status(500).send("La descripcion es muy larga, máximo 50 caracteres")
        }
        else if(e.errno === 1216){
            res.status(500).send("No existe ese id de marca")
        }        
        res.status(500).json(e)
    }

  });


router.post("/crear/vehiculo", async (req, res) => {     
    try{           
    const {modelo} = req.body;
    if (modelo ===""){
        return res.status(500).send("El modelo no puede estar vacio")
    }
    const resultado= await conection.query(`
    INSERT INTO vehiculo (${Object.keys(req.body).join()})
    VALUES(?,?,?,?,?);`,Object.values(req.body))      
    return res.json(Object.values(req.body))}
    catch(e){
        if (e.errno===1062){
            res.status(500).send("Número de placa ya existe")
        }
        else if(e.errno === 1366){
            res.status(500).send("El modelo debe ser númerico")
        } 
        else if(e.errno === 1292){
            res.status(500).send("La fecha debe tener formato AAAA-MM-DD")
        }                     
        res.status(500).json(e)
    }
  });


module.exports = router;

