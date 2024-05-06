import { PrismaClient } from '@prisma/client';
import { locations } from './data/locations';
import { categories } from './data/categories';

const prisma = new PrismaClient();

async function main() {
  for (const location of locations) {
    await prisma.location.create({ data: location });
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
