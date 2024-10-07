const prisma = require('../config/dbConfig'); // Import the Prisma client

// Create a new user
const createUser = async (email, password) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password,
            },
        });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Find a user by email
const findUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: { email },
        });
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

// Find a user by ID
const findUserById = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

// Update a user
const updateUser = async (id, data) => {
    try {
        return await prisma.user.update({
            where: { id },
            data,
        });
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Delete a user
const deleteUser = async (id) => {
    try {
        return await prisma.user.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

// Export the functions
module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser,
};