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
  // const newUsers = await prisma.user.createMany({
  //   data: [
  //     { name: 'Sunny', email: 'sunny@gmail.com', },
  //     { name: 'Ravi', email: 'ravi@gmail.com', }
  //   ]
  // });
  // console.log(newUsers)

  // Read || ( Fetch Data )
  // Get All Users 
  // const users = await prisma.user.findMany()
  // console.log(users)

  // Get a Single User by ID
  // const user = await prisma.user.findUnique({
  //   where: { id: 1 },
  // })
  // console.log(user)

  // Get a Single User with Filtering
  // const user = await prisma.user.findMany({
  //   where: { name: "Sunny" },
  // })
  // console.log(user)

  // Update Data
  // Update One User
  // const user = await prisma.user.update({
  //   where: { id: 1 },
  //   data: { email: "rahul@gmail.com" },
  // })
  // console.log(user)

    // Update Multipul User
  const user = await prisma.user.updateMany({
    where: { name: "Rahul"},
    data: { email: "rahul@gmail.com" },
  })
  console.log(user)
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  })