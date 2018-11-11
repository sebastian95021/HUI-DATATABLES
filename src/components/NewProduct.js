import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../actions/productsActions';
import { compose } from 'redux';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
      },
    iconSmall: {
        fontSize: 20,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class NewProduct extends Component {

    state = {
        name: '',
        price: '',
        error: false
    }

    nameProduct = e => {
        this.setState({name:e.target.value});
    }

    priceProduct = e => {
        this.setState({price:e.target.value});
    }

    sendData = e => {
        e.preventDefault();

        const { name, price } = this.state;

        if (name === '' | price === ''){
            this.setState({error:true});
            return;
        }

        this.setState({error:false});

        const infoProduct = {
            name: name,
            price: price
        }

        this.props.addProduct(infoProduct);

        this.props.history.push('/');
    }

    handleClose = () => {
        this.setState({ error: false });
      };


    render() {
        const { classes } = this.props;
        const { error } = this.state;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container spacing={16} justify="center">
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2>Agregar Producto</h2>
                                <FormControl fullWidth className={classes.container}>
                                    <TextField id="product" label="Nombre" onChange={this.nameProduct} />
                                    <TextField id="price" label="Precio" margin="normal" onChange={this.priceProduct}/>
                                    <Button onClick={this.sendData} variant="contained" color="primary" size="small" className={classes.button}>
                                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Save
                                    </Button>
                                </FormControl>

                                <Snackbar
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    open={error}
                                    autoHideDuration={4000}
                                    onClose={this.handleClose}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">Error en formulario</span>}
                                    action={[
                                        <IconButton
                                          key="close"
                                          aria-label="Close"
                                          color="inherit"
                                          className={classes.close}
                                          onClick={this.handleClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>,
                                    ]}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

NewProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    connect(null, {addProduct}),
    withStyles(styles),
)(NewProduct);