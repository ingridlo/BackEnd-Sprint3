const { Router } = require("express");
const router = Router();
const express = require("express");
const conection = require("../DB/db");

// Eliminar Vehiculo
router.delete('/eliminar/vehiculo/:placa', async (req, res) => {
    try {
        const { placa } = req.params;
        const result = await conection.query(`DELETE FROM vehiculo WHERE numero_placa = '${placa}';`);
        res.status(200).json("Objeto Eliminado");
    } catch (e) {
        res.json(e);
    }
})


module.exports = router;