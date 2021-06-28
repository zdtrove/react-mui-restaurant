import React from 'react'
import { Table as MuiTable, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	table: {
		'& tbody td': {
			fontWeight: '300'
		},
		'& tbody tr:hover': {
			backgroundColor: '#fffbf2',
			cursor: 'pointer'
		},
		'& .MuiTableCell-root': {
			border: 'none'
		}
	}
}))

const Table = props => {
	const classes = useStyles()

	return (
		<MuiTable className={classes.table}>
			{props.children}
		</MuiTable>
	)

}

export default Table