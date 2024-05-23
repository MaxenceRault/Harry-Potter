import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from 'bcrypt'

class AuthentificationController {
    async signUp(req, res) {
        const { email, name, password } = req.body;
    
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });
            
            // Génération du token en utilisant votre fonction generateToken
            const token = generateToken(user);
    
            // Envoi de la réponse avec le token et les détails de l'utilisateur
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    

  async login(req, res) {
    try {
      const body = req.body;

      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      const isSamePassword = await comparePassword(
        body.password,
        user.password
      );

      if (isSamePassword === false) {
        return res.status(401).send("Invalid password");
      }

      const token = generateToken(user);

      return res.status(200).send({ user, token });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
}

export default new AuthentificationController();
