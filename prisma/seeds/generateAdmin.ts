import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import config from './config.json';
import * as bcrypt from 'bcrypt';
import { Role } from '@/modules/auth/roles/roles.enum';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const generateAdmin = async () => {
  const testPassword = config.admin.password;
  const hashedPassword = await bcrypt.hash(testPassword, 10);
  const user = prisma.user.upsert({
    where: { email: config.admin.email },
    update: {},
    create: {
      email: config.admin.email,
      username: config.admin.username,
      passwordHash: hashedPassword,
      role: config.admin.role as Role,
    },
  });

  return user;
};

const main = async () => {
  const user = await generateAdmin();
  console.log('\n\n----------  Admin  -----------');
  console.log(user);
  console.log('\nAdmin created successfully!');
};

main()
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})
.finally(async () => {
  console.log('\n\nDiconecting Prisma...');
  await prisma.$disconnect();
  console.log('Prisma Disconected');
})
