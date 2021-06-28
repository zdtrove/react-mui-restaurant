import {
    makeStyles,
    List,
    ListItemText,
    ListItem,
    ListItemSecondaryAction,
    InputBase,
    Paper,
    IconButton
} from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllFoodItem } from '../../api'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000'
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

const SearchFoodItems = props => {
    const { values, setValues } = props
    let orderedFoodItems = values.orderDetails
    const classes = useStyles()
    const [foodItems, setFoodItems] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [searchList, setSearchList] = useState([])

    useEffect(() => {
        const res = getAllFoodItem()
        setFoodItems(res)
        setSearchList(res)
    }, [])

    useEffect(() => {
        let x = [...foodItems]
        x = x.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLowerCase())
                && orderedFoodItems.every(item => item.foodItemId !== y.foodItemId)
        })
        setSearchList(x)
    }, [searchKey, foodItems, orderedFoodItems])

    const addFoodItem = foodItem => {
        let x = {
            orderMasterId: values.orderMasterId,
            orderDetailIds: 0,
            foodItemId: foodItem.foodItemId,
            quantity: 1,
            foodItemPrice: foodItem.price,
            foodItemName: foodItem.foodItemName
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase
                    className={classes.searchInput}
                    placeholder="Search food items"
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {
                    searchList.map((item, idx) => (
                        <ListItem key={idx} onClick={() => addFoodItem(item)}>
                            <ListItemText
                                primary={item.foodItemName}
                                secondary={`$${item.price}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => addFoodItem(item)}>
                                    <PlusOneIcon />
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}

export default SearchFoodItems
