import { useState } from 'react';
import { deleteUser, getUserById, updateUser } from '../../utils/api';

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

export default User;
