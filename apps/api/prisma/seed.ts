import { PrismaClient } from '@prisma/client';
import { cities } from './data/cities';
import { categories } from './data/categories';
import { tickettypes } from './data/tickettypes';

const prisma = new PrismaClient();

async function main() {
  for (const city of cities) {
    await prisma.city.create({ data: city });
  }
  for (const category of categories) {
    await prisma.category.create({ data: category });
  }
  for (const tickettype of tickettypes) {
    await prisma.ticketType.create({ data: tickettype });
  }
}

main()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
