import React from 'react'
import Form from '../../layouts/Form'
import { Input, Select, Button } from '../../controls'
import { makeStyles, Grid, InputAdornment, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import ReorderIcon from '@material-ui/icons/Reorder'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllCustomer } from '../../api'
import { roundTo2DecimalPoint } from "../../utils"

const pMethods = [
	{ id: 'none', title: 'Select' },
	{ id: 'Cash', title: 'Cash' },
	{ id: 'Card', title: 'Card' }
]

const useStyles = makeStyles(theme => ({
	adornmentText: {
		'& .MuiTypography-root': {
			color: '#f3b33d',
			fontWeight: 'bolder',
			fontSize: '1.5rem'
		}
	},
	submitButtonGroup: {
		backgroundColor: '#f3b33d',
		color: '#000',
		margin: theme.spacing(1),
		'& .MuiButton-label': {
			textTransform: 'none'
		},
		'&:hover': {
			backgroundColor: '#f3b33d'
		}
	}
}))

const OrderForm = props => {
	const classes = useStyles()
	const { values, setValues, errors, setErrors, handleInputChange } = props
	const [customerList, setCustomerList] = useState([])

	useEffect(() => {
		const res = getAllCustomer()
		let customerList = res.map(item => ({
			id: item.customerID,
			title: item.customerName
		}))
		customerList = [{ id: 0, title: 'Select' }].concat(customerList)
		setCustomerList(customerList)
	}, [])

	useEffect(() => {
		let gTotal = values.orderDetails.reduce((tempTotal, item) => {
			return tempTotal + (item.quantity * item.foodItemPrice)
		}, 0)
		setValues({
			...values,
			gTotal: roundTo2DecimalPoint(gTotal)
		})
	}, [JSON.stringify(values.orderDetails)])

	const validateForm = () => {
		let temp = {}
		temp.customerId = values.customerID !== 0 ? "" : "This field is required"
		temp.pMethod = values.pMethod !== "none" ? "" : "This field is required"
		temp.orderDetails = values.orderDetails.length !== 0 ? "" : "This field is required"
		setErrors({ ...temp })

		return Object.values(temp).every(x => x === "")
	}

	const submitOrder = e => {
		e.preventDefault()
		if (validateForm()) {

		}
	}

	return (
		<Form onSubmit={submitOrder}>
			<Grid container>
				<Grid item xs={6}>
					<Input
						disabled
						label="Order Number"
						name="orderNumber"
						value={values.orderNumber}
						InputProps={{
							startAdornment: <InputAdornment
								position="start"
								className={classes.adornmentText}
							>#</InputAdornment>
						}}
					/>
					<Select
						label="Customer"
						name="customerId"
						value={values.customerId}
						onChange={handleInputChange}
						options={customerList}
					/>
				</Grid>
				<Grid item xs={6}>
					<Select
						label="Payment Method"
						name="pMethod"
						value={values.pMethod}
						onChange={handleInputChange}
						options={pMethods}
					/>
					<Input
						disabled
						label="Grand Total"
						name="gTotal"
						value={values.gTotal}
						InputProps={{
							startAdornment: <InputAdornment
								position="start"
								className={classes.adornmentText}
							>$</InputAdornment>
						}}
					/>
					<ButtonGroup className={classes.submitButtonGroup}>
						<MuiButton size="large" type="submit" endIcon={<RestaurantMenuIcon />}>Submit</MuiButton>
						<MuiButton size="small" startIcon={<ReplayIcon />} />
					</ButtonGroup>
					<Button size="large" startIcon={<ReorderIcon />}>
						Orders
					</Button>
				</Grid>
			</Grid>
		</Form>
	)
}

export default OrderForm