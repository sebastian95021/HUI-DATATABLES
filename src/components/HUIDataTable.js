import React, { Component } from 'react';
import Product from './Product';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SearchIcon from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from "@material-ui/icons/Clear";

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

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
    main: {
        display: "flex",
        flex: "1 0 auto",
    },
        searchIcon: {
        marginTop: "10px",
        marginRight: "8px",
    },
        searchText: {
        flex: "0.8 0",
    },
    clearIcon: {
        "&:hover": {
            color: "#FF0000",
        },
    },
});


class HUIDataTable extends Component {
    static defaultProps = {
        title: ""
    };

    state = {
        rowsPerPage: 2,
        data: [],
        resultData: [],
        displayData: [],
        showSearch: false,
        generalSearchValue: null,
        rowsCount:0
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown, false);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown, false);
    }

    onKeyDown = event => {
        if (event.keyCode === 13) {
            this.getDataSearch(this.state.generalSearchValue);
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            const { data } = this.props;
    
            //Total Rows
            const rowsCount = data.length;
    
            //Filter the amount of rows to display
            const displayData = data.slice(0,this.state.rowsPerPage);

            //Set state initialize
            this.setState({ data, displayData, rowsCount});
        }
    }

    //Search matches rows 
    getDataSearch = generalSearchValue => {
        const { data, rowsPerPage } = this.state;
        let resultData;

        //Search matches
        if (generalSearchValue !== '' && generalSearchValue !== null){
            resultData = data.filter(row => {
                const keys = Object.keys(row);
                let found = false;
                for (let i = 0; i < keys.length; i++) {

                    if (typeof(row[keys[i]]) === "object"){
                        for (let index in row[keys[i]]) {
                            const rowChildren = row[keys[i]][index];
                            const keysChildren = Object.keys(rowChildren);
                            for (let j = 0; j < keysChildren.length; j++) {
                                let cellValue = rowChildren[keysChildren[j]];
                                if (String(cellValue).toLowerCase() === generalSearchValue.toLowerCase())
                                    found = true;
                            }
                        }
                    }else{
                        let cellValue = row[keys[i]];
                        if (String(cellValue).toLowerCase() === generalSearchValue.toLowerCase())
                            found = true;
                    }

                    if (found) break;
                }

                if (found)
                    return true;
                else
                    return false;
            });
        }else{
            resultData = data;
        }

        console.log(resultData);

        //Filter the amount of rows to display
        const displayData = resultData.slice(0, rowsPerPage);

        //Set state
        this.setState({displayData, resultData});
    }

    //Hide input search
    hideSearch = () => {
        this.setState({showSearch: false});
    }

    //Show input search
    showSearchInput = () => {
        this.setState({showSearch: true});
    };

    //Typing input search
    handleSearchTextChange = e => {
        const value = e.target.value;
        this.setState({generalSearchValue: value});
    }

    render() {
        const { classes, title } = this.props;
        
        const {
            displayData,
            showSearch,
        } = this.state;

        return (
            <Grid item xs={12}>
                <Grid container spacing={16} justify="center">
                    <Grid item xs={10}>
                        <Paper className={classes.paper}>

            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        {showSearch === true ? (


                            <div className={classes.main}>
                                <SearchIcon className={classes.searchIcon} />
                                <TextField
                                    className={classes.searchText}
                                    autoFocus={true}
                                    onChange={this.handleSearchTextChange}
                                    fullWidth={true}
                                />
                                <IconButton className={classes.clearIcon} onClick={this.hideSearch}>
                                    <ClearIcon />
                                </IconButton>
                            </div>



                        ) : (<p>{title}</p>)}
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton variant="fab" aria-label="search" onClick={this.showSearchInput} className={classes.button}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton variant="fab" aria-label="download" className={classes.button}>
                            <CloudDownloadIcon />
                        </IconButton>
                        <IconButton variant="fab" aria-label="search" className={classes.button}>
                            <ViewColumnIcon />
                        </IconButton>
                        <IconButton variant="fab" aria-label="search" className={classes.button}>
                            <FilterListIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>



                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <CustomTableCell>Id</CustomTableCell>
                                <CustomTableCell numeric>Nombre</CustomTableCell>
                                <CustomTableCell numeric>Precio</CustomTableCell>
                                <CustomTableCell numeric>Ingrediente</CustomTableCell>
                                <CustomTableCell numeric>Cantidad</CustomTableCell>
                                <CustomTableCell numeric>Acciones</CustomTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {displayData.map(product => (
                                <Product key={product.id} product={product}></Product>
                            ))}
                            </TableBody>
                        </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

HUIDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HUIDataTable);