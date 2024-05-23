
import prisma from "../config/prisma.js";

class CardController {
  async getCardsByUserId(req, res) {
    const { userId } = req.params;

    try {
      const cards = await prisma.card.findMany({
        where: { userId: parseInt(userId) },
      });
      return res.status(200).send(cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      return res.status(500).send({ message: 'Error fetching cards', error });
    }
  }

  async addCardsToUser(req, res) {
    const { userId } = req.params;
    const { cards } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const addedCards = await Promise.all(cards.map(async (card) => {
        return await prisma.card.create({
          data: {
            name: card.name,
            house: card.house, // Nouvelle propriété
            image: card.image, // Nouvelle propriété
            alt: card.alt, // Nouvelle propriété
            userId: parseInt(userId),
          },
        });
      }));

      return res.status(201).send(addedCards);
    } catch (error) {
      console.error("Error adding cards:", error);
      return res.status(500).send({ message: 'Error adding cards', error });
    }
  }
}

export default new CardController();
