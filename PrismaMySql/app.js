import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Create (Insert data)
  // Single User
  // const user = await prisma.user.create({
  //   data: { name: 'Alice', email: 'alice@prisma.io', }
  // });
  // console.log(user)

  // Multiple User
  const newUsers = await prisma.user.createMany({
    data: [
      { name: 'Sunny', email: 'sunny@gmail.com', },
      { name: 'Ravi', email: 'ravi@gmail.com', }
    ]
  });
  console.log(newUsers)
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  })