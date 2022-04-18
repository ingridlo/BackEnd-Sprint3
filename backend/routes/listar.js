const { Router } = require("express");
const router = Router();
const express = require("express");
const conection = require("../DB/db");

router.get("/listar/vehiculo", async (req, res) => {
  try {
    const [rows] = await conection.query(`SELECT * FROM vehiculo;`);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});

router.get("/listar/modelos", async (req, res) => {
  try {
    const [maximo] = await conection.query(
      `SELECT MAX (modelo) FROM vehiculo;`
    );
    const [minimo] = await conection.query(
      `SELECT MIN (modelo) FROM vehiculo;`
    );
    modelo = [{
      maximoModelo: Object.values(maximo[0])[0],
      minimoModelo: Object.values(minimo[0])[0],
    }];
    res.status(200).json(modelo);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});

router.post("/listar/fechas", async (req, res) => {
  try {
    const { fecha_ini, fecha_fin } = req.body;    
    const [result] = await conection.query(
      `SELECT * FROM vehiculo WHERE fecha_ven_seguro BETWEEN '${fecha_ini}' AND '${fecha_fin}'`
    );    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});

router.post("/listar/filterModelos/", async (req, res) => {
  try {
    const { modelo_1, modelo_2 } = req.body;
    const [result] = await conection.query(
      `SELECT * FROM vehiculo WHERE modelo BETWEEN '${modelo_1}' AND '${modelo_2}'`
    );    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});

router.get("/listar/consultaUnica", async (req, res) => {
  try {
    const [result] = await conection.query(
      `SELECT numero_placa, modelo, descripcion, descripcionM FROM vehiculo JOIN linea ON vehiculo.id_linea = linea.id_linea JOIN marca ON linea.id_marca = marca.id_marca WHERE linea.estado = "S";`
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});

router.get("/listar/sumModelos", async (req, res) => {
  try {
    const [resultado] = await conection.query(
      `SELECT SUM(modelo) suma FROM vehiculo;`
    );            
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});

router.get("/listar/promediar", async (req, res) => {
  try {
    const [resultado] = await conection.query(
      `SELECT AVG(modelo) promedio FROM vehiculo;`
    );       
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});

router.get("/listar/contar", async (req, res) => {
  try {
    const [resActivo] = await conection.query(
      `SELECT COUNT(estado) contarActivo FROM linea WHERE estado="S";`
    );
    const [resNoActivo] = await conection.query(
      `SELECT COUNT(estado) contarInactivo FROM linea WHERE estado="N";`
    );     
    let contar = [resActivo[0],resNoActivo[0]]

    res.status(200).json(contar);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
});


module.exports = router;
