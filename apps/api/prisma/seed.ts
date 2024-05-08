import { PrismaClient } from '@prisma/client';
import { cities } from './data/cities';
import { categories } from './data/categories';

const prisma = new PrismaClient();

async function main() {
  for (const city of cities) {
    await prisma.city.create({ data: city });
  }
  for (const category of categories) {
    await prisma.category.create({ data: category });
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
