import { PrismaClient } from '@prisma/client';
import { locations } from './data/locations';

const prisma = new PrismaClient();

async function main() {
  for (const location of locations) {
    await prisma.location.create({ data: location });
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
