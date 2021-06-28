import React, { useState, useEffect } from 'react'
import { getAllOrder } from '../../api'
import Table from '../../layouts/Table'
import {
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core'
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone'

const OrderList = props => {
	const { setOrderId, setShowOrderList } = props
	const [orderList, setOrderList] = useState([])

	useEffect(() => {
		const res = getAllOrder()
		setOrderList(JSON.parse(res))
	}, [])

	const showForUpdate = id => {
		setOrderId(id)
		setShowOrderList(false)
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
					orderList.map((item, idx) => (
						<TableRow onClick={e => showForUpdate(item.orderNumber)} key={idx}>
							<TableCell>
								{item.orderNumber}
							</TableCell>
							<TableCell>
								{item.customer.customerName}
							</TableCell>
							<TableCell>
								{item.pMethod}
							</TableCell>
							<TableCell>
								{item.gTotal}
							</TableCell>
							<TableCell>
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