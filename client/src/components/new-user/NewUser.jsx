import { useState } from 'react';
import { createUser } from '../../utils/api';

const NewUser = () => {
	const [newUser, setNewUser] = useState({
		name: '',
		email: ''
	});

	return (
		<form onSubmit={() => createUser(newUser)}>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					onChange={e => setNewUser({ ...newUser, name: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					onChange={e => setNewUser({ ...newUser, email: e.target.value })}
				/>
			</div>
			<input type='submit' value='CREATE USER' />
		</form>
	);
};

export default NewUser;
