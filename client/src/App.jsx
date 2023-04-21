import { useEffect, useState } from 'react';
import User from './components/user/User';
import { METHODS } from './constants/methods';
import { fetchData } from './utils/fetchData';

const getAllUsers = async setUsers => {
	const data = await fetchData('http://127.0.0.1:3000/api/users', {
		method: METHODS.GET
	});
	setUsers(data);
};

const App = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers(setUsers);
	}, [users]);

	if (users.length === 0) return <h2>Loading users...</h2>;

	return (
		<>
			{users.map(user => (
				<User key={user.userId} userId={user.userId} userName={user.name} />
			))}
		</>
	);
};

export default App;
