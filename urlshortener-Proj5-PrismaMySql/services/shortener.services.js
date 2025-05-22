
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const loadLinks = async () => {
  const rows = await prisma.shortLink.findMany()
  return rows;
}

export const getLinkByShortCode = async (shortCode) => {
  const rows = await prisma.shortLink.findUnique({
    where: { shortCode },
  })

  return rows;
}

export const saveLinks = async ({ url, shortCode }) => {
  const rows = await prisma.shortLink.create({
    data: { shortCode, url }
  });

  return rows;
};