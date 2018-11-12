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
        const { indexColumn, columns, rowData } = this.props;
        const classes = this.props.classes;
        const rowspan = rowData.children.length;

        return (
            <React.Fragment>
                <CustomTableRow>
                    {Object.keys(rowData).map((key,i) => {
                        if (key !== "children")
                            return (<TableCell rowSpan={rowspan} key={i}>{rowData[key]}</TableCell>)
                        else{
                            return (
                                <React.Fragment key={i}>
                                    {rowData[key].map((rowChildren,index) => (
                                        Object.keys(rowChildren).map((keyChildren,j) => {
                                            if (keyChildren === "id") return;
                                            if (index === 0){
                                                return (<TableCell key={j}>{rowChildren[keyChildren]}</TableCell>)
                                            }else{
                                                return (
                                                    <CustomTableRow key={j}>
                                                        <TableCell>{rowChildren[keyChildren]}</TableCell>
                                                    </CustomTableRow>
                                                )
                                            }
                                        })
                                    ))}
                                </React.Fragment>
                            )
                        }
                    })}
                </CustomTableRow>
            </React.Fragment>
        );
    }
}

export default compose(
    connect(null,{deleteProduct}),
    withStyles(styles)
)(Product);