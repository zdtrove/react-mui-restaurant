import React, { useState, useEffect } from 'react'
import { getAllOrder, deleteOrder } from '../../api'
import Table from '../../layouts/Table'
import {
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone'

const OrderList = props => {
	const { setOrderId, setShowOrderList, setNotify } = props
	const [orderList, setOrderList] = useState([])

	useEffect(() => {
		const res = getAllOrder()
		setOrderList(JSON.parse(res))
	}, [])

	const showForUpdate = id => {
		setOrderId(id)
		setShowOrderList(false)
	}

	const handleDeleteOrder = id => {
		if (window.confirm("Are you sure to delete this record?")) {
			const res = deleteOrder(id)
			setOrderList(res)
			setOrderId(null)
			setNotify({ isOpen: true, message: 'Deleted successfully' })
		}
	}

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Order No.</TableCell>
					<TableCell>Customer</TableCell>
					<TableCell>Payed With</TableCell>
					<TableCell>Grand Total</TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{
					orderList === null ? <TableRow><TableCell>No Orders</TableCell></TableRow>
						: orderList.map((item, idx) => (
							<TableRow key={idx}>
								<TableCell onClick={() => showForUpdate(item.id)}>
									{item.orderNumber}
								</TableCell>
								<TableCell onClick={() => showForUpdate(item.id)}>
									{item.customer.customerName}
								</TableCell>
								<TableCell onClick={() => showForUpdate(item.id)}>
									{item.pMethod}
								</TableCell>
								<TableCell onClick={() => showForUpdate(item.id)}>
									{item.gTotal}
								</TableCell>
								<TableCell onClick={() => handleDeleteOrder(item.id)}>
									<DeleteOutlineTwoToneIcon color="secondary" />
								</TableCell>
							</TableRow>
						))
				}
			</TableBody>
		</Table>
	)
}

export default OrderList