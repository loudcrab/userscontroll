import React from 'react';
import { Main } from './Components/Main';
import { UsersProvider } from './store/users';

function App() {
	return (
		<UsersProvider>
			<div className="App">
				<Main />
			</div>
		</UsersProvider>
	);
}

export default App;
