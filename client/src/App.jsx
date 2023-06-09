import { useEffect, useState } from 'react';
import NewUser from './components/new-user/NewUser';
import User from './components/user/User';
import { getAllUsers } from './utils/api';

const App = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers(setUsers);
	}, [users]);

	if (users.length === 0) return <h2>Loading users...</h2>;

	return (
		<>
			<NewUser />
			{users.map(user => (
				<User key={user.userId} userId={user.userId} userName={user.name} />
			))}
		</>
	);
};

export default App;
