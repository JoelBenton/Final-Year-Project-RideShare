const prisma = require('../config/dbConfig'); // Import the Prisma client

// Create or update a refresh token
const createRefreshToken = async (token, userId, userDeviceId, expiresAt) => {
    try {
        // Upsert the refresh token based on user ID and device ID
        return await prisma.refreshToken.upsert({
            where: {
                userDeviceId: userDeviceId,
                userId: userId,
            },
            create: {
                token,
                userId,
                userDeviceId,
                expiresAt,
            },
            update: {
                token,
                expiresAt,
            },
        });
    } catch (error) {
        throw new Error('Error creating/updating refresh token: ' + error.message);
    }
};

// Find a refresh token by user ID
const findRefreshTokenByUserId = async (userId) => {
    try {
        return await prisma.refreshToken.findUnique({
            where: { userId },
        });
    } catch (error) {
        throw new Error('Error finding refresh token: ' + error.message);
    }
};

// Find a valid refresh token by user ID
const findValidRefreshTokenByUserId = async (userId) => {
    try {
        const currentDate = new Date(); // Get the current date

        return await prisma.refreshToken.findUnique({
            where: {
                userId_expiresAt: {
                    userId,
                    expiresAt: {
                        gte: currentDate, // Ensure expiresAt is greater than or equal to the current date
                    },
                },
            },
        });
    } catch (error) {
        throw new Error('Error finding valid refresh token: ' + error.message);
    }
};

// Delete a refresh token
const deleteRefreshToken = async (token) => {
    try {
        return await prisma.refreshToken.delete({
            where: { token },
        });
    } catch (error) {
        throw new Error('Error deleting refresh token: ' + error.message);
    }
};

// Remove all refresh tokens for a user
const deleteRefreshTokensForUser = async (userId) => {
    try {
        return await prisma.refreshToken.deleteMany({
            where: {
                userId: userId,
            },
        });
    } catch (error) {
        throw new Error('Error deleting refresh tokens for user: ' + error.message);
    }
};

// Export the functions
module.exports = {
    createRefreshToken,
    findRefreshTokenByUserId,
    findValidRefreshTokenByUserId,
    deleteRefreshToken,
    deleteRefreshTokensForUser,
};