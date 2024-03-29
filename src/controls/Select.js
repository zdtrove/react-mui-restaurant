import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core'

const Select = props => {
	const { name, label, value, varient, onChange, options, error = null } = props

	return (
		<FormControl
			variant={varient || "outlined"}
			{...(error && { error: true })}
		>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				label={label}
				name={name}
				value={value}
				onChange={onChange}
			>
				{
					options.map(
						(item, idx) => (<MenuItem key={idx} value={item.id}>{item.title}</MenuItem>)
					)
				}
			</MuiSelect>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	)
}

export default Select