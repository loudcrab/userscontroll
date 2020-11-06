import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Box, Input, MenuItem, Select, TextField, Checkbox, ListItemText, Grid, InputLabel } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { positionOptions, sexOptions, useUsersContext } from '../store/users';
import { users, user } from '../store/types';
export const List = () => {
	return (
		<Box width="100%">
			<Users />
		</Box>
	);
};

const Users = () => {
	const { usersState: users, setUsersState: setUsers, selectedUser, setSelectedUser} = useUsersContext();

	const changeField = ({ key, value }: { key: string; value: any }) => {
		if(!users.length) return 
		console.log('selected',)
		const idx = users.findIndex(({ id }:{id: number}) => id === selectedUser?.id)
		setUsers((users: users) => {
			users[idx][key] = value;
			users[idx].edit = true;
			return [ ...users ];
		});
	};
	
	return (
		<Grid container spacing={8}>
			<Grid item xs={6}>
				{users.map((item: user, idx: number) => {
					return <MenuItem onClick={(e) => {
						console.log('users[idx]',users[idx])
						setSelectedUser(users[idx])
					}} key={idx}>{idx+1}. {item.name}</MenuItem>;
				})}
			</Grid>
			<Grid item xs={6}>
				{selectedUser.id !== -1 ? <User
					selectedUser={selectedUser}
					changeField={({ key, value }: { key: string; value: any }) => changeField({ key, value })}
					{...selectedUser}
				/>: 'Выберите сотрудника или создайте нового'}
			</Grid>
		</Grid>
	);
};

const User = ({changeField, selectedUser}: {changeField: Function; selectedUser: any}) => {
	const {id, name, position, birthday, sex, fired, сolleagues} = selectedUser
	console.log('id', id)
	return (
		<Box display="flex" width="100%" flexDirection='column'>
			<Box >
	<InputLabel >id: {id}</InputLabel>			
			</Box>
			<Box paddingTop='8px'>
			<InputLabel >Имя</InputLabel>
				<Input
					value={name}
					onChange={(e) => {
						changeField({ key: 'name', value: e.target.value });
					}}
				/>
			</Box>
			<Box  paddingTop='8px'>
			<InputLabel >Должность</InputLabel>
				<Select
					value={position}
					onChange={(e) => {
						changeField({ key: 'position', value: e.target.value });
					}}
				>
					{positionOptions.map((title, idx) => (
						<MenuItem key={idx} value={title}>
							{title}
						</MenuItem>
					))}
				</Select>
			</Box>
			<Box  paddingTop='8px'>
			<InputLabel >Пол</InputLabel>
				<Select
					value={sex}
					onChange={(e) => {
						changeField({ key: 'sex', value: e.target.value });
					}}
				>
					{sexOptions.map((title, idx) => (
						<MenuItem key={idx} value={title}>
							{title}
						</MenuItem>
					))}
				</Select>
			</Box>
			<Box paddingTop='8px'>
			<InputLabel >Дата рождения</InputLabel>
				<TextField
					id="date"
					value={birthday}
					type="date"
					onChange={(e) => {
						changeField({ key: 'birthday', value: e.target.value });
					}}
				/>
			</Box>
			<Box paddingTop='8px'>
			<InputLabel >Уволен</InputLabel>
				<Checkbox
					value={fired}
					onChange={(e) => {
						changeField({ key: 'fired', value: e.target.value });
					}}
				/>
			</Box>

			<Box paddingTop='8px'>
			<InputLabel >Коллеги</InputLabel>
				<SelectColleagues  сolleagues={сolleagues} onChange={changeField} />
			</Box>
		</Box>
	);
};

const SelectColleagues = ({сolleagues, onChange}: {сolleagues: Array<string>; onChange: Function}) => {
	const { usersState: users, selectedUser} = useUsersContext();
	const usersList = useMemo(() => users.map(({ name }: { name: string }) => name), [ users ]);
	const [ personName, setPersonName ] = React.useState(selectedUser.сolleagues) as any;
	
	const handleChange = (event: any) => {
		setPersonName(event.target.value);
		onChange({ key: 'сolleagues', value: event.target.value })
	};	

	return (
		<Select			
			labelId="demo-mutiple-checkbox-label"
			id="demo-mutiple-checkbox"
			multiple
			value={personName}
			onChange={handleChange}
			input={<Input />}
			renderValue={(selected: any): React.ReactNode => selected.join(', ')}
		>
			{usersList.map((name: any) => (
				<MenuItem key={name} value={name}>
					<Checkbox checked={personName.indexOf(name) > -1} />
					<ListItemText primary={name} />
				</MenuItem>
			))}
		</Select>
	);
};
