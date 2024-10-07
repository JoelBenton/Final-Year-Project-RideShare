const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

prisma.$connect()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

module.exports = prisma;