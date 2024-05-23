// const express = require("express");
// const UsersController = require("../controllers/UserController");
import express from "express";
import UsersController from "../controllers/UserController.js";
import AuthentificationController from "../controllers/AuthentificationController.js";
import AuthentificationMiddlewares from "../middlewares/AuthentificationMiddlewares.js";
// import {getHouse , postHouse} from "../controllers/iotController.js";



const router = express.Router();



router.get("/users",UsersController.index); //Liste des utilisateur 

router.post("/users",UsersController.store);

router.get("/users/:id",UsersController.show);

router.put("/users/:id",UsersController.update);
router.delete("/users/:id",UsersController.destroy);

router.post("/signUp",AuthentificationController.signUp)


router.post("/login",AuthentificationController.login)

router.get("/getMyProfile",
AuthentificationMiddlewares.authentification,
UsersController.getMyProfile
)





// router.get("/iot" , getHouse);

// router.post("/postiot", postHouse);

// router.post("/users/:userId/cards", AuthentificationMiddlewares.authentification, CardController.addCardToUser);
// router.get("/users/:userId/cards", AuthentificationMiddlewares.authentification, CardController.getAllCardsForUser);

// module.exports = router;
export default router;



