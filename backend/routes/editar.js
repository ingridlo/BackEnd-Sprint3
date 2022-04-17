const { Router } = require("express");
const router = Router();
const express = require("express");
const conection = require("../DB/db");

// Editar Marca
router.patch("/editar/marca/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let newArray = Object.keys(req.body).map((item) => {
      return item + " = " + `'${req.body[item]}'`;
    });
    newArray.join();
    const actualizar = await conection.query(
      `UPDATE marca SET ${newArray.join()} WHERE id_marca =${id};`
    );
    res.status(200).json(req.body);
  } catch (e) {
    if (e.errno === 1406) {
      res.status(500).send("Nombre de la marca o descripción demasido larga");
    } else if (e.errno === 1265) {
      res.status(500).send("El estado solo puede ser S o N");
    }
    res.status(500).json(e);
  }
});

// Editar Linea
router.patch("/editar/linea/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let newArray = Object.keys(req.body).map((item) => {
      return item + " = " + `'${req.body[item]}'`;
    });
    newArray.join();
    const actualizar = await conection.query(
      `UPDATE linea SET ${newArray.join()} WHERE id_marca =${id};`
    );
    res.status(200).json(req.body);
  } catch (e) {
    if (e.errno === 1406) {
      res.status(500).send("Nombre de la linea o descripción demasiado larga");
    } else if (e.errno === 1265) {
      res.status(500).send("El estado solo puede ser S o N");
    }
    res.status(500).json(e);
  }
});

// Editar Vehículo
router.patch("/editar/vehiculo/:placa", async (req, res) => {
  try {
    const { placa } = req.params;
    let newArray = Object.keys(req.body).map((item) => {
      return item + " = " + `'${req.body[item]}'`;
    });
    newArray.join();
    const actualizar = await conection.query(
      `UPDATE vehiculo SET ${newArray.join()} WHERE numero_placa = "${placa}";`
    );
    res.status(200).json(req.body);
  } catch (e) {
    if (e.errno === 1062) {
      res.status(500).send("Número de placa ya existe");
    } else if (e.errno === 1366) {
      res.status(500).send("El modelo debe ser númerico");
    } else if (e.errno === 1292) {
      res.status(500).send("La fecha debe tener formato AAAA-MM-DD");
    }
    res.status(500).json(e);
  }
});

module.exports = router;
