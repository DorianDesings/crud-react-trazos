import { METHODS } from '../constants/methods';
import { fetchData } from './fetchData';

export const getAllUsers = async setUsers => {
	const data = await fetchData('http://127.0.0.1:3000/api/users', {
		method: METHODS.GET
	});
	setUsers(data);
};

export const getUserById = async userId => {
	const data = await fetchData(
		`http://127.0.0.1:3000/api/users/${userId}`,
		METHODS.GET
	);

	console.log(data);
};

export const updateUser = async (isEditing, setIsEditing, name, userId) => {
	if (isEditing) {
		const data = await fetchData(`http://127.0.0.1:3000/api/users/${userId}`, {
			method: METHODS.PATCH,
			body: JSON.stringify({ name }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		console.log(data);
	}

	setIsEditing(!isEditing);
};

export const deleteUser = async userId => {
	const data = await fetchData(`http://127.0.0.1:3000/api/users/${userId}`, {
		method: METHODS.DELETE
	});

	console.log(data);
};
