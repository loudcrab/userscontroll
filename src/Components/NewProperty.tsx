import React, { useState } from 'react';
import { createModal } from 'react-modal-promise';

import { Box, Input, MenuItem, Select, TextField, Checkbox, ListItemText, Grid, InputLabel } from '@material-ui/core';

import { Button } from './Button';

const CreateNewProperty = ({close} : any) => {
	const [ title, setTitle ] = useState('');
    const [ type, setType ] = useState('string');
    
    const handleClose = ()=> close()
    const handleSave = ()=> close({title, type})
	return (
		<Box
			p="12px"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			position="fixed"
			top={40}
			left={40}
			bgcolor="#FFF"
			borderRadius={4}
			width="300px"
			height="400px"
			boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
		>
			<Box>
				<Box paddingTop="8px">
					<InputLabel>Выберите название нового атрибута для сотрудника</InputLabel>
					<Input value={title} onChange={(e) => setTitle(e.target.value)} />
				</Box>
				<Box paddingTop="8px">
					<InputLabel>Выберите тип атрибута</InputLabel>
					<PropertyType value={type} onChange={setType} />
				</Box>
			</Box>
			<Grid container>
				<Grid item xs>
					<Button onClick={handleSave}>Сохранить</Button>
				</Grid>
				<Grid item xs >
					<Button   onClick={handleClose}>
						Отмена
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

const PropertyType = ({ value, onChange }: { value: string; onChange: Function }) => (
	<Select
		value={value}
		onChange={(e) => {
			onChange(e.target.value);
		}}
	>
		{propertyTypes.map((title, idx) => (
			<MenuItem key={idx} value={title}>
				{title}
			</MenuItem>
		))}
	</Select>
);

const propertyTypes = [ 'string', 'date', 'boolean', 'number' ];

export const newPropertyModal = createModal(CreateNewProperty);
