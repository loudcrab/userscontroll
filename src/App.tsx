import React from 'react';
import { Main } from './Components/Main';
import { UsersProvider } from './store/users';
import { Box } from '@material-ui/core';
import ModalContainer from 'react-modal-promise';
function App() {
	return (
		<UsersProvider>
			<div className="App">
				<Main />
			</div>
			<Box>
				<ModalContainer />
			</Box>
		</UsersProvider>
	);
}

export default App;
