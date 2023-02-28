import prismaClient from '../prisma';

class GetLast3MessagesService {
  async execute() {
    const last3Messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return last3Messages;
  }
}

export default GetLast3MessagesService;