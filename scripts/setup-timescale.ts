import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from "dotenv"
dotenv.config()

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const main = async () => {
  console.log('⏳ Setting up TimescaleDB...');

  await prisma.$executeRawUnsafe(`
    CREATE EXTENSION IF NOT EXISTS timescaledb;
  `);

  console.log('✅ Extension enabled');

  await prisma.$executeRawUnsafe(`
    SELECT create_hypertable('"telemetry"', 'timestamp', if_not_exists => TRUE);
  `);

  console.log('✅ Hypertable created');

  await prisma.$executeRawUnsafe(`
    ALTER TABLE "telemetry" SET (
      timescaledb.compress,
      timescaledb.compress_segmentby = 'device_id'
    );
  `)
  
  console.log('✅ Compression created');
};

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });