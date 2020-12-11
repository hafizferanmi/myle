import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TablePagination,
} from '@material-ui/core';
import {actions} from '../../../../services/index';
import {connect} from 'react-redux';
import {stableSort, getSorting } from "../../../../utils/sorting";
import Ride from "./Ride";

class RidesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page     : 0,
            order    : 'asc',
            order_by : 'calories',
        };

        this.handleClickRide         = this._handleClickRide.bind(this);
        this.handleChangePage        = this._handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this._handleChangeRowsPerPage.bind(this);
        this.updateRide              = this._updateRide.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if((nextProps.search_options.page - 1) !== this.state.page) {
            this.setState({
                page: nextProps.search_options.page - 1
            });
        }
    }

    _handleClickRide(ride) {
        this.props.onRideView(ride);
    }

    _handleChangePage(event, newPage) {
        this.setState({
            ...this.state,
            page          : newPage
        });
        this.props.updateFilters({page: newPage+1});
    }

    _handleChangeRowsPerPage(event) {
        this.props.updateFilters({per_page: event.target.value});
    }

    _updateRide(ride_id, options){
        this.props.updateRide(ride_id, options);
    }

    render() {
        let selected = false;

        return (
            <div className='wrapper-table-rides'>
                <div className={'table-ride'}>
                    <Table aria-labelledby='tableTitle' size={'medium'} className={'table'}>
                        <TableBody>
                            {stableSort([...this.props.rides], getSorting(this.state.order, this.state.order_by))
                                .map(row => {
                                    if(this.props.search_options.brokered === 'all' || row.brokered === this.props.search_options.brokered){
                                        selected = (this.props.ride !== null && this.props.ride.id === row.id);
                                        return (
                                            <Ride key={row.id}
                                                  ride={row}
                                                  isSelected={selected}
                                                  company={this.props.company}
                                                  handleClickRide={this.handleClickRide}
                                                  updateRide={this.updateRide}/>
                                        );
                                    }
                                    return null;
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                        component='div'
                        className='pagination'
                        count={10000}
                        rowsPerPage={this.props.search_options.per_page}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateFilters: (filters) => dispatch(actions.RidesActions.updateFilters(filters)),
        updateRide: (ride_id, options) => dispatch(actions.RidesActions.updateRide(ride_id, options)),
    }
}

function mapStateToProps(state)
{
    return {
        ride              : state.rides.ride,
        rides             : state.rides.rides,
        total             : state.rides.total,
        search_options    : state.rides.search_options,
        company           : state.app.company
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RidesTable);
