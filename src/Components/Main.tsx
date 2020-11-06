import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { useUsersContext } from '../store/users';
import { List } from './List';
import { Panel } from './Panel';
export const Main = () => {
	

	return (
		<Box>
			<Panel />
			<List/>
		</Box>
	);
};
