import React, { useState } from 'react';

import { Box, Grid } from '@material-ui/core';
import { Button } from './Button';
import { useUsersContext } from '../store/users';
export const Panel = () => {
	const { update, save, remove, add } = useUsersContext();
	return (
		<Box p={2}>
			<Grid container xs={6} spacing={2}>
				<Grid item xs>
					<Button onClick={save}>Сохранить изменения»</Button>
				</Grid>
				<Grid item xs>
					<Button onClick={update}>Обновить данные</Button>
				</Grid>
				<Grid item xs>
					<Button onClick={remove}>Удалить выбранного сотрудника</Button>
				</Grid>
				<Grid item xs>
					<Button onClick={add}>Добавить нового сотрудника</Button>
				</Grid>
			</Grid>
		</Box>
	);
};
