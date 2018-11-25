import React, { Component } from 'react';
import Product from './Product';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SearchIcon from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from "@material-ui/icons/Clear";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
    rootForm: {
        padding: "16px 24px 16px 24px",
        fontFamily: "Roboto",
    },
    title: {
        marginLeft: "-7px",
        fontSize: "14px",
        color: "#424242",
        textAlign: "left",
        fontWeight: 500,
    },
    formGroup: {
        marginTop: "8px",
    },
    formControl: {},
    checkbox: {
        padding: "0px",
        width: "32px",
        height: "32px",
    },
    checkboxRoot: {
        "&$checked": {
            color: "#027cb5",
        },
    },
    checked: {},
    label: {
        fontSize: "15px",
        marginLeft: "8px",
        color: "#4a4a4a",
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
    typography: {
        margin: theme.spacing.unit * 2,
    },
    pagination: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
      },
    textFilter: {
        backgroundColor: "#6f7071"
    }
});


class HUIDataTable extends Component {

    //Default Values
    static defaultProps = {
        title: ""
    };

    //React State 
    state = {
        rowsPerPage: 5,
        textPagination: null,
        page: 1,
        data: [],
        resultData: [],
        displayData: [],
        showSearch: false,
        showFilters: false,
        generalSearchValue: null,
        rowsCount:0,
        columns: [],
        visibleColumns:[],
        anchorEl: null
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
            const { data, columns } = this.props;
            const { rowsPerPage, page } = this.state;
    
            //Total Rows
            const rowsCount = data.length;
            const textPagination = "1-" + rowsPerPage*page + " de " + rowsCount;
    
            //Filter the amount of rows to display
            const displayData = data.slice(0,rowsPerPage);

            //Push columns visibles in array
            let visibleColumns = [];
            for (let i = 0; i < columns.length; i++) {
                if (columns[i]["display"])
                    visibleColumns.push(i);
            }

            //Set state initialize
            this.setState({ data, displayData, rowsCount, columns, textPagination, visibleColumns});
        }
    }

    //Event Change rowsPerPage
    handleChangeRowPerPage = event => {
        const {data, page} = this.state;

        const rowsPerPage = event.target.value;

        this.changePagination(page, rowsPerPage);
    }

    //Event first, prev, next and last button pagination
    Pagination = button => {
        const {data, page, rowsCount, rowsPerPage} = this.state;

        switch (button) {
            case "first":
                this.changePagination(1, rowsPerPage);
                break;
            case "prev":
                this.changePagination(page - 1, rowsPerPage);
                break;
            case "next":
                this.changePagination(page + 1, rowsPerPage);
                break;
            case "last":
                this.changePagination( Math.ceil(rowsCount / rowsPerPage), rowsPerPage );
                break;
            default:
                break;
        }
    }

    //Execute changes in the pagination
    changePagination = (page, rowsPerPage) => {
        const {rowsCount, data} = this.state;

        const pageLess = page - 1;
        const since = pageLess * rowsPerPage;
        const until = since + rowsPerPage;
        const textPagination = (since===0 ? 1 : since) + "-" + (until>rowsCount ? rowsCount : until) + " de " + rowsCount;
        const displayData = data.slice(since, until);

        this.setState({ displayData, rowsPerPage, textPagination, page });
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

                return found;
            });
        }else
            resultData = data;

        //Filter the amount of rows to display
        const displayData = resultData.slice(0, rowsPerPage);

        //Set state
        this.setState({displayData, resultData});
    }

    //Typing input search
    handleSearchTextChange = e => {
        const value = e.target.value;
        this.setState({generalSearchValue: value});
    }

    //Change columns
    handleColChange = index => event => {
        let columns = Object.assign(this.state.columns);
        columns[index].display = event.target.checked;

        //Push columns visibles in array
        let visibleColumns = [];
        for (let i = 0; i < columns.length; i++) {
            if (columns[i]["display"])
                visibleColumns.push(i);
        }

        this.setState({ columns, visibleColumns });
    }

    // Functional Events

    //Hide input search
    hideSearch = () => {
        this.setState({showSearch: false});
    }

    //Show input search
    showSearchInput = () => {
        this.setState({showSearch: true});
    };

    //View Columns
    handleClickViewColumns = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    //Close view columns
    handleCloseViewColumns = () => {
        this.setState({anchorEl: null});
    };

    //Show/Hide filters advanced
    handleShowFilters = () => {
        this.setState({showFilters: !this.state.showFilters});
    }

    render() {
        const { classes, title } = this.props;
        
        const {
            displayData,
            showSearch,
            columns,
            anchorEl,
            rowsPerPage,
            textPagination,
            visibleColumns,
            page,
            rowsCount,
            showFilters
        } = this.state;

        const open = Boolean(anchorEl);

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
                                        <IconButton aria-owns={open ? 'simple-popper' : undefined} aria-haspopup="true" variant="fab" aria-label="viewcolumns" onClick={this.handleClickViewColumns} className={classes.button}>
                                            <ViewColumnIcon />
                                        </IconButton>
                                        <Popover
                                            id="simple-popper"
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={this.handleCloseViewColumns}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                            >
<FormControl component={"fieldset"} className={classes.rootForm} aria-label="formViewColumns">
        <Typography variant="caption" className={classes.title}>Ver Columnas</Typography>
        <FormGroup className={classes.formGroup}>
          {columns.map((column, index) => (
                <FormControlLabel
                  key={index}
                  classes={{
                    root: classes.formControl,
                    label: classes.label,
                  }}
                  control={
                    <Checkbox
                      className={classes.checkbox}
                      classes={{
                        root: classes.checkboxRoot,
                        checked: classes.checked,
                      }}
                      onChange={this.handleColChange(index)}
                      checked={column.display}
                      value={column.name}
                    />
                  }
                  label={column.name}
                />
            ))
          }
        </FormGroup>
      </FormControl>
                                        </Popover>


                                        <IconButton variant="fab" aria-label="filter" onClick={this.handleShowFilters} className={classes.button}>
                                            <FilterListIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </div>

                            <Table className={classes.table}>
                                <TableHead>
                                <TableRow>
                                {columns.map(column => (
                                    column.display ?
                                    <CustomTableCell key={column.name}>{column.name}</CustomTableCell>
                                    : false
                                ))}
                                </TableRow>

                                {showFilters === true ? 
                                    (<TableRow>
                                    {columns.map(column => (
                                        column.display ?
                                        <TableCell key={column.name}>
                                        <div className={classes.main}>
                                            <IconButton variant="fab" aria-label="filter" className={classes.button}>
                                                a<span className={classes.textFilter}>b</span>c
                                            </IconButton>
                                            <TextField
                                                id={"filter"+column.name}
                                                className={classes.searchText}
                                                margin="normal"
                                            />
                                        </div>
                                        </TableCell>
                                        : false
                                        
                                    ))}
                                    </TableRow>)
                                    : false
                                }


                                </TableHead>
                                <TableBody>
                                {displayData.map( rowData => (
                                    <Product key={rowData.id} rowData={rowData} visibleColumns={visibleColumns}></Product>
                                ))}
                                </TableBody>

                                <TableFooter>
                                    <TableRow>
                                        <TableCell>{textPagination}</TableCell>
                                        <TableCell colSpan={visibleColumns.length - 1} numeric>
                                            <Select value={rowsPerPage} onChange={this.handleChangeRowPerPage}>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                            </Select>
                                                    <IconButton disabled={page === 1} variant="fab" aria-label="search" onClick={() => this.Pagination("first")} className={classes.button}>
                                                        <FirstPageIcon />
                                                    </IconButton>
                                                    <IconButton disabled={page === 1} variant="fab" aria-label="search" onClick={() => this.Pagination("prev")} className={classes.button}>
                                                        <KeyboardArrowLeft />
                                                    </IconButton>
                                                    <IconButton disabled={page === Math.ceil(rowsCount / rowsPerPage)} variant="fab" aria-label="search" onClick={() => this.Pagination("next")} className={classes.button}>
                                                        <KeyboardArrowRight />
                                                    </IconButton>
                                                    <IconButton disabled={page === Math.ceil(rowsCount / rowsPerPage)} variant="fab" aria-label="search" onClick={() => this.Pagination("last")} className={classes.button}>
                                                        <LastPageIcon />
                                                    </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
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