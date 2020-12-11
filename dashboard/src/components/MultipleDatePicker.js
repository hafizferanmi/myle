import React, {PureComponent} from 'react';
import { DayPickerSingleDateController, CalendarDay } from 'react-dates'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class MultiDatePicker extends PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            dates: []
        };
    }

    handleChange = (date) => {
        const { dates } = this.state;

        const newDates = dates.includes(date) ? dates.filter(d => !date.isSame(d)) : [...dates, date];

        this.setState({ dates: newDates });

        this.props.onChange && this.props.onChange(newDates.map((date) => {
            return date.format('MM/DD/YYYY')
        }))
    };

    render () {
        return (
            <div style={{width: '100%', minHeight: 200}}>
                <DayPickerSingleDateController
                    numberOfMonths={1}
                    onDateChange={this.handleChange}
                    renderCalendarDay={props => {
                        const { day, modifiers } = props;

                        if (this.state.dates && this.state.dates.some( item => item.isSame(day))) {
                            modifiers && modifiers.add('selected')
                        }
                        else {
                            modifiers && modifiers.delete('selected')
                        }

                        return (
                            <CalendarDay { ...props } modifiers={modifiers} />
                        )
                    }} />
            </div>
        )
    }
}

export default MultiDatePicker
