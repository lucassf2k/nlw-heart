import prismaClient from "../prisma";

class ProfileUserService {
  async execute(user_id: string) {
    const userProfile = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      }
    });

    return userProfile;

  }
}

export default ProfileUserService;