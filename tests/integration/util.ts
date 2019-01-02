import { User } from "entity/User";

export interface ISeed {
    user1: User;
    user2: User;
}

export async function seedDB(): Promise<ISeed> {
    await User.remove(await User.find());

    const user1 = new User("User1", "user1@users.com");
    await user1.setPassword("User1");
    await user1.save();

    const user2 = new User("User2", "user2@users.com");
    await user2.setPassword("User2");
    await user2.save();

    return { user1, user2 };
}
