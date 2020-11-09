import React, { useState } from 'react';

import { Box, Grid } from '@material-ui/core';
import { Button } from './Button';
import { useUsersContext } from '../store/users';
export const Panel = () => {
	const { update, save, remove, add, addProperty, selectedUser, isEdited } = useUsersContext();

	const isUserSelected = selectedUser?.id !== -1
	return (
		<Box p={2}>
			<Grid container xs={6} spacing={2}>
				<Grid item xs>
					<Button onClick={save} disabled={!isEdited}>Сохранить изменения»</Button>
				</Grid>
				<Grid item xs>
					<Button onClick={update}>Обновить данные</Button>
				</Grid>
				<Grid item xs>
					<Button onClick={remove} disabled={!isUserSelected}>Удалить выбранного сотрудника</Button>
				</Grid>
				<Grid item xs>
					<Button onClick={add}>Добавить нового сотрудника</Button>
				</Grid>
				<Grid item xs>
					<Button onClick={addProperty} disabled={!isUserSelected}>Добавить новый атрибут</Button>
				</Grid>
			</Grid>
		</Box>
	);
};
