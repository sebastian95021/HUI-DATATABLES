import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allProducts } from '../actions/productsActions'; 
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import HUIDataTable from './HUIDataTable';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 600,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class Products extends Component {

    componentDidMount(){
        this.props.allProducts();
    }

    render() {
        const { classes, products } = this.props;

        const columns = ["id","name","price","ingrediente","cantidad"];
        const options = [];

        return (
            <Grid container className={classes.root} spacing={16}>
                <HUIDataTable
                    title={"Lista de Productos"}
                    data={products}
                    columns={columns}
                    options={options}
                />
            </Grid>
        ); 
    }
}

Products.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    products: state.products.products
})

export default compose( 
    connect(mapStateToProps, {allProducts}),
    withStyles(styles)
 ) (Products);