import { Button as Btn } from '@material-ui/core';
import React from 'react';

export const Button = (props: any) => (
	<Btn color="primary" variant="contained" {...props}>
		{props.children}
	</Btn>
);
