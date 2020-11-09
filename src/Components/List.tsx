import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Box, Input, MenuItem, Select, TextField, Checkbox, ListItemText, Grid, InputLabel } from '@material-ui/core';

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
	const { users, updateUser, fetchUsers, selectedUser, selectUser } = useUsersContext();

	useEffect(() => {
		fetchUsers();
	}, []);
	const changeField = ({ key, value }: { key: string; value: any }) => {
		if (!users.length) return;
		updateUser({ key, value });
	};

	if (!users) return <Box>Loading</Box>;

	return (
		<Grid container spacing={8}>
			<Grid item xs={6}>
				{users.map((item: user, idx: number) => {
					return (
						<MenuItem
							onClick={(e) => {
								selectUser(idx);
							}}
							key={idx}
						>
							{idx + 1}. {item.name}
						</MenuItem>
					);
				})}
			</Grid>
			<Grid item xs={6}>
				{selectedUser.id !== -1 ? (
					<User
						selectedUser={selectedUser}
						changeField={({ key, value }: { key: string; value: any }) => changeField({ key, value })}
						{...selectedUser}
					/>
				) : (
					'Выберите сотрудника или создайте нового'
				)}
			</Grid>
		</Grid>
	);
};

const User = ({ changeField, selectedUser }: { changeField: Function; selectedUser: any }) => {
	const { id, name, position, birthday, sex, fired, сolleagues } = selectedUser;
	return (
		<Box display="flex" width="100%" flexDirection="column">
			<Box>
				<InputLabel>id: {id}</InputLabel>
			</Box>
			<Box paddingTop="8px">
				<InputLabel>Имя</InputLabel>
				<Input
					value={name}
					onChange={(e) => {
						changeField({ key: 'name', value: e.target.value });
					}}
				/>
			</Box>
			<Box paddingTop="8px">
				<InputLabel>Должность</InputLabel>
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
			<Box paddingTop="8px">
				<InputLabel>Пол</InputLabel>
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
			<Box paddingTop="8px">
				<InputLabel>Дата рождения</InputLabel>
				<TextField
					id="date"
					value={birthday}
					type="date"
					onChange={(e) => {
						changeField({ key: 'birthday', value: e.target.value });
					}}
				/>
			</Box>
			<Box paddingTop="8px">
				<InputLabel>Уволен</InputLabel>
				<Checkbox
					value={fired}
					onChange={(e) => {
						changeField({ key: 'fired', value: e.target.value });
					}}
				/>
			</Box>

			<Box paddingTop="8px">
				<InputLabel>Коллеги</InputLabel>
				<SelectColleagues сolleagues={сolleagues} onChange={changeField} />
			</Box>
			<Box paddingTop="8px">
				<InputLabel />
				<CustomPropsBlock  />
			</Box>
		</Box>
	);
};

const SelectColleagues = ({ сolleagues, onChange }: { сolleagues: Array<string>; onChange: Function }) => {
	const { users, selectedUser } = useUsersContext();
	const usersList = useMemo(() => users.map(({ name }: { name: string }) => name), [ users ]);

	const [ personName, setPersonName ] = useState(selectedUser.сolleagues) as any;

	useEffect(
		() => {
			setPersonName(selectedUser.сolleagues);
		},
		[ selectedUser ]
	);

	const handleChange = (event: any) => {
		setPersonName(event.target.value);
		onChange({ key: 'сolleagues', value: event.target.value });
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

const CustomPropsBlock = () => {
	const { updateUser, selectedUser } = useUsersContext();
	const customProps : iCustomProps = selectedUser.customProps
	console.log(selectedUser,)
	const handleChange = (props: any) => {
		updateUser({...props, customProps: true})
	};

	const Block = () => {
		let block = [];
		for (const key in customProps) {
			if (Object.prototype.hasOwnProperty.call(customProps, key)) {
				const { type, value } = customProps[key];

				const component = (
					<Box paddingTop="8px">
						<InputLabel>{key}</InputLabel>
						{INPUT_TYPE[type]({
							onChange: (value: string) => handleChange({ value, key, typeOfField: type }),
							value: value
						})}
					</Box>
				);
				block.push(component);
			}
		}
		return block;
	};
	return (
		<Box>
			<InputLabel>Дополнительные параметры сотрудника</InputLabel>
			{Block()}
		</Box>
	);
};

const INPUT_TYPE = {
	string: ({ onChange, value }: input_type) => (
		<Input
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
		/>
	),
	date: ({ onChange, value }: input_type) => (
		<TextField
			value={value}
			type="date"
			onChange={(e) => {
				onChange(e.target.value);
			}}
		/>
	),
	number: ({ onChange, value }: input_type) => (
		<Input
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
		/>
	),
	boolean: ({ onChange, value }: input_type) => (
		<Checkbox
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
		/>
	)
};

type type = 'string' | 'boolean' | 'number' | 'date';
interface iCustomProps {
	[key: string]: {
		value: string;
		type: type;
	};
}

interface input_type {
	onChange: Function;
	value: string;
}
