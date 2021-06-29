import React from 'react'
import useForm from '../../hooks/useForm'
import OrderForm from './OrderForm'
import { Grid } from '@material-ui/core'
import SearchFoodItems from './SearchFoodItems'
import OrderedFoodItems from './OrderedFoodItems'
import { generateId } from '../../utils'

const getFreshModelObject = () => ({
	id: null,
	orderNumber: generateId(),
	customerId: 0,
	pMethod: 'none',
	gTotal: 0,
	deletedOrderItemIds: '',
	orderDetails: []
})

const Order = () => {
	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetFormControls
	} = useForm(getFreshModelObject)

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<OrderForm
					{...{
						values,
						setValues,
						errors,
						setErrors,
						handleInputChange,
						resetFormControls
					}}
				/>
			</Grid>
			<Grid item md={6}>
				<SearchFoodItems {...{
					values,
					setValues
				}} />
			</Grid>
			<Grid item md={6}>
				<OrderedFoodItems {...{
					values,
					setValues
				}} />
			</Grid>
		</Grid>
	)
}

export default Order