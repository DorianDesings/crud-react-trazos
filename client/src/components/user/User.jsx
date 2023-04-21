import { useState } from 'react';
import { METHODS } from '../../constants/methods';
import { fetchData } from '../../utils/fetchData';

const User = ({ userId, userName }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(userName);

	return (
		<div key={userId}>
			{isEditing ? (
				<input value={name} onChange={e => setName(e.target.value)} />
			) : (
				<h2>{userName}</h2>
			)}

			{!isEditing && (
				<button onClick={() => getUserById(userId)}>Get Details</button>
			)}
			<button onClick={() => updateUser(isEditing, setIsEditing, name, userId)}>
				{isEditing ? 'Save name' : 'Edit Name'}
			</button>
			<button onClick={() => deleteUser(userId)}>Delete User</button>
		</div>
	);
};

const getUserById = async userId => {
	const data = await fetchData(
		`http://127.0.0.1:3000/api/users/${userId}`,
		METHODS.GET
	);

	console.log(data);
};

const updateUser = async (isEditing, setIsEditing, name, userId) => {
	console.log(name);
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

const deleteUser = async userId => {
	const data = await fetchData(`http://127.0.0.1:3000/api/users/${userId}`, {
		method: METHODS.DELETE
	});

	console.log(data);
};

export default User;
