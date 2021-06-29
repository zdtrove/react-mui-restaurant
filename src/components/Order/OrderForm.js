import React, { useState, useEffect } from 'react'
import Form from '../../layouts/Form'
import Popup from '../../layouts/Popup'
import Notification from '../../layouts/Notification'
import { Input, Select, Button } from '../../controls'
import { makeStyles, Grid, InputAdornment, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import ReorderIcon from '@material-ui/icons/Reorder'
import { getAllCustomer, createOrder, getOrderById, updateOrderById } from '../../api'
import { generateId, roundTo2DecimalPoint } from "../../utils"
import OrderList from './OrderList'

const pMethods = [
	{ id: "none", title: 'Select' },
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
	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetFormControls
	} = props
	const [customerList, setCustomerList] = useState([])
	const [showOrderList, setShowOrderList] = useState(false)
	const [orderId, setOrderId] = useState(null)
	const [notify, setNotify] = useState({ isOpen: false })

	useEffect(() => {
		const res = getAllCustomer()
		let customerList = res.map(item => ({
			id: item.customerId,
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
	}, [values.orderDetails, setValues])

	useEffect(() => {
		if (!orderId) resetFormControls()
		else {
			const res = getOrderById(orderId)
			setValues(res)
			setErrors({})
		}
	}, [orderId])

	const validateForm = () => {
		let temp = {}
		temp.customerId = values.customerId !== 0 ? "" : "This field is required"
		temp.pMethod = values.pMethod !== "none" ? "" : "This field is required"
		temp.orderDetails = values.orderDetails.length !== 0 ? "" : "This field is required"
		setErrors({ ...temp })

		return Object.values(temp).every(x => x === "")
	}

	const submitOrder = e => {
		e.preventDefault()
		if (validateForm()) {
			const customer = customerList.filter(cus => cus.id === values.customerId)[0]
			let temp = {
				customerId: customer.id,
				customerName: customer.title
			}
			if (!values.id) {
				createOrder({ ...values, id: generateId(), customer: temp })
				resetFormControls()
				setNotify({ isOpen: true, message: "New order is created" })
			} else {
				updateOrderById(values.id, values)
				setOrderId(null)
				setNotify({ isOpen: true, message: "The order is updated" })
			}
		}
	}

	const resetForm = () => {
		resetFormControls()
		setOrderId(null)
	}

	return (
		<>
			<Form onSubmit={submitOrder}>
				<Grid container>
					<Grid item sm={6}>
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
							error={errors.customerId}
						/>
					</Grid>
					<Grid item sm={6}>
						<Select
							label="Payment Method"
							name="pMethod"
							value={values.pMethod}
							onChange={handleInputChange}
							options={pMethods}
							error={errors.pMethod}
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
							<MuiButton onClick={resetForm} size="small" startIcon={<ReplayIcon />} />
						</ButtonGroup>
						<Button onClick={() => setShowOrderList(true)} size="large" startIcon={<ReorderIcon />}>
							Orders
						</Button>
					</Grid>
				</Grid>
			</Form>
			<Popup
				title="List of Orders"
				openPopup={showOrderList}
				setOpenPopup={setShowOrderList}
			>
				<OrderList {...{ setOrderId, setShowOrderList, setNotify }} />
			</Popup>
			<Notification {...{ notify, setNotify }} />
		</>
	)
}

export default OrderForm