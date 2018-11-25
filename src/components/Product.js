import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteProduct } from '../actions/productsActions';

//Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
        const { visibleColumns, rowData } = this.props;
        const classes = this.props.classes;

        let rowspan;
        let children;
        if (rowData.children !== undefined){
            rowspan = rowData.children.length;
            children = rowData['children'];
        }else{
            rowspan = 1;
            children = [];
        }

        let cont = -1;
        let rowspanPosition = null;


        return (
            <React.Fragment>
                <CustomTableRow>
                    {Object.keys(rowData).map((key,i) => {
                        if (key !== "children"){
                            cont = cont + 1;
                            if (visibleColumns.includes(cont))
                                return (<TableCell rowSpan={rowspan} key={i}>{rowData[key]}</TableCell>)
                            else
                                return false;
                        }
                        else{
                            return (
                                <React.Fragment key={i}>
                                    {rowData[key].map((rowChildren,index) => (
                                        Object.keys(rowChildren).map((keyChildren,j) => {
                                            if (keyChildren === "id") return;
                                            if (index === 0){
                                                cont = cont + 1;
                                                rowspanPosition = (rowspanPosition===null) ? cont : rowspanPosition;
                                                if (visibleColumns.includes(cont))
                                                    return (<TableCell key={j}>{rowChildren[keyChildren]}</TableCell>)
                                                else
                                                    return false;
                                            }
                                        })
                                    ))}
                                </React.Fragment>
                            )
                        }
                    })}
                </CustomTableRow>

                {children.map((rowChildren,index) => {
                    if (index !== 0){
                        cont = rowspanPosition - 1;
                        return (
                            <CustomTableRow key={index}>
                            {Object.keys(rowChildren).map((keyChildren,j) => {
                                if (keyChildren === "id") return;
                                cont = cont + 1;
                                if (visibleColumns.includes(cont))
                                    return (<TableCell key={j}>{rowChildren[keyChildren]}</TableCell>)
                                else
                                    return false;
                            })}
                            </CustomTableRow>
                        )
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