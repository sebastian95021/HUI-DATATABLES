import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteProduct } from '../actions/productsActions';

//Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

const CustomTableRow = withStyles(theme => ({
    root: {
        height: "20px"
    },
  }))(TableRow);

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class Product extends Component {

    deleteProduct = () => {
        const {id} = this.props.product;
        this.props.deleteProduct(id);
    }

    render() {
        const { id, name, price, ingredients } = this.props.product;
        const classes = this.props.classes;
        const rowspan = ingredients.length;

        return (
            <React.Fragment>
                {ingredients.map((ingredient,index) => {
                    if (index === 0){
                        return (
                            <CustomTableRow key={id}>
                                <TableCell rowSpan={rowspan} numeric>{id}</TableCell>
                                <TableCell rowSpan={rowspan}>{name}</TableCell>
                                <TableCell rowSpan={rowspan} numeric>{price}</TableCell>
                                <TableCell>{ingredient.name}</TableCell>
                                <TableCell>{ingredient.qty}</TableCell>
                                <TableCell rowSpan={rowspan}>
                                    <IconButton component={Link} to={`/edit/${id}`} variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={this.deleteProduct} variant="fab" aria-label="Delete" className={classes.button}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </CustomTableRow>
                        );
                    }else{
                        return (
                            <CustomTableRow key={ingredient.id}>
                                <TableCell>{ingredient.name}</TableCell>
                                <TableCell>{ingredient.qty}</TableCell>
                            </CustomTableRow>
                        );
                    }
                })}
            </React.Fragment>
        );
    }
}

export default compose(
    connect(null,{deleteProduct}),
    withStyles(styles)
)(Product);