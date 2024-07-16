// api.js

let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', city: 'Bogotá', address: '123 Street', userType: 'Client', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', city: 'Medellín', address: '456 Avenue', userType: 'Admin', status: 'Inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-123-4567', city: 'Cali', address: '789 Boulevard', userType: 'Client', status: 'Active' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', phone: '555-987-6543', city: 'Barranquilla', address: '101 Plaza', userType: 'Admin', status: 'Inactive' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', phone: '555-555-5555', city: 'Cartagena', address: '202 Lane', userType: 'Client', status: 'Active' }
];

export const fetchUsers = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users);
        }, 1000);
    });
};

export const createUser = (user) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            user.id = users.length ? users[users.length - 1].id + 1 : 1;
            users.push(user);
            resolve(user);
        }, 1000);
    });
};

export const updateUser = (updatedUser) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = users.findIndex((user) => user.id === updatedUser.id);
            if (index !== -1) {
                users[index] = updatedUser;
                resolve(updatedUser);
            } else {
                reject('User not found');
            }
        }, 1000);
    });
};

export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = users.findIndex((user) => user.id === userId);
            if (index !== -1) {
                users.splice(index, 1);
                resolve(true);
            } else {
                reject('User not found');
            }
        }, 1000);
    });
};
