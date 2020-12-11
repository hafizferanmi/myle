import React, { PureComponent } from 'react';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment-timezone'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './picker.scss';
import {withStyles} from "@material-ui/core/index";


const styles = {
    root: {
        width: '240px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 20px',
        '& .DateRangePicker': {
            position: 'absolute',
            '& .DateRangePickerInput': {
                padding: '0 2px 2px',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                height: '35px !important',
            },
        },
        '& .DateInput': {
            width: '100px',
            margin: '0 2px'
        },
        '& .DateInput_input': {
            fontSize: '1.6rem',
            alignItems: 'center',
            padding: '5px 6px 4.2px',
            lineHeight: 0,
        },
        '& .DateRangePickerInput_arrow': {
            margin: '3px',
        },
        '& .DateInput_input__focused': {
            borderBottom: '2px solid #4C79D1'
        },
        '& .CalendarDay__selected_span': {
            background: '#4C79D1',
            color: '#FFFFFF',
            border: '1px solid #e4e7e7'
        },
        '& .CalendarDay__selected': {
            background: '#4C79D1',
            color: '#FFFFFF',
            border: '1px solid #e4e7e7'
        },
        '& .CalendarDay__selected:hover': {
            background: '#3f51b5',
            color: '#FFFFFF',
            border: '1px solid #e4e7e7'
        },
        '& .CalendarDay__hovered_span:hover, .CalendarDay__hovered_span': {
            background: '#e4e7e7',
            color: '#3f51b5',
            border: '1px double #FFF'
        },
        '& .DayPickerKeyboardShortcuts_show__bottomRight::before': {
            borderRight: '33px solid #4C79D1'
        },

        '& .DayPickerKeyboardShortcuts_show__bottomRight:hover::before': {
            borderRight: '33px solid #3f51b5'
        },
        '& .DayPickerKeyboardShortcuts_show__topRight::before': {
            borderRight: '33px solid #4C79D1'
        },
        '& .DayPickerKeyboardShortcuts_show__topRight:hover::before': {
            borderRight: '33px solid #3f51b5'
        },
        '& .DayPickerKeyboardShortcuts_show__topLeft::before': {
            borderRight: '33px solid #4C79D1'
        },
        '& .DayPickerKeyboardShortcuts_show__topLeft:hover::before': {
            borderRight: '33px solid #3f51b5'
        },
    },
    rootRidePage: {
        width: '250px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 16px 0 0',
        '& .DateRangePicker': {
            position: 'absolute',
            '& .DateRangePickerInput': {
                padding: '0 2px 2px',
                border: 'none',
                height: '35px !important',
            },
        },
        '& .DateInput': {
            width: '100px',
            margin: '0 2px'
        },
        '& .DateInput_input': {
            fontSize: '1.6rem',
            alignItems: 'center',
            padding: '5px 6px 4.2px',
            lineHeight: 0,
        },
        '& .DateRangePicker_picker': {
            zIndex: 2
        },
        '& .DateRangePickerInput_arrow': {
            margin: '3px',
        },
        '& .DateInput_input__focused': {
            borderBottom: '2px solid #4C79D1'
        },
        '& .CalendarDay__selected_span': {
            background: '#4C79D1',
            color: '#FFFFFF',
            border: '1px solid #e4e7e7'
        },
        '& .CalendarDay__selected': {
            background: '#4C79D1',
            color: '#FFFFFF',
            border: '1px solid #e4e7e7'
        },
        '& .CalendarDay__selected:hover': {
            background: '#3f51b5',
            color: '#FFFFFF',
            border: '1px solid #e4e7e7'
        },
        '& .CalendarDay__hovered_span:hover, .CalendarDay__hovered_span': {
            background: '#e4e7e7',
            color: '#3f51b5',
            border: '1px double #FFF'
        },
        '& .DayPickerKeyboardShortcuts_show__bottomRight::before': {
            borderRight: '33px solid #4C79D1'
        },

        '& .DayPickerKeyboardShortcuts_show__bottomRight:hover::before': {
            borderRight: '33px solid #3f51b5'
        },
        '& .DayPickerKeyboardShortcuts_show__topRight::before': {
            borderRight: '33px solid #4C79D1'
        },
        '& .DayPickerKeyboardShortcuts_show__topRight:hover::before': {
            borderRight: '33px solid #3f51b5'
        },
        '& .DayPickerKeyboardShortcuts_show__topLeft::before': {
            borderRight: '33px solid #4C79D1'
        },
        '& .DayPickerKeyboardShortcuts_show__topLeft:hover::before': {
            borderRight: '33px solid #3f51b5'
        },
    }
};

class DatePicker extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
        startDate: null,
        endDate: null,
        focusedInput: null,
      // focusedInput: 'startDate',
    };
  }

  datesUpdated = ({ startDate, endDate }) => {
      this.setState({
          startDate : startDate,
          endDate   : endDate
      });
      this.props.change({
          target: {
              name: 'from_datetime',
              value: startDate ? startDate.format('YYYY-MM-DDTHH:mm') : ''
          }
      });
      this.props.change({
          target: {
              name: 'to_datetime',
              value: endDate ? endDate.format('YYYY-MM-DDTHH:mm') : ''
          }
      });
  };

  componentWillReceiveProps(nextProps) {
      if (nextProps.from_datetime && nextProps.from_datetime !== this.props.from_datetime) {
          this.setState({
              startDate : moment(nextProps.from_datetime)
          })
      }
      if (nextProps.to_datetime && nextProps.to_datetime !== this.props.to_datetime) {
          this.setState({
              endDate   : moment(nextProps.to_datetime)
          })
      }
  }

  componentDidMount() {
      this.setState({
          startDate : this.props.from_datetime ? moment(this.props.from_datetime) : moment().subtract(1, 'weeks'),
          endDate   : this.props.to_datetime ? moment(this.props.to_datetime) : moment()
      })
  }

    render() {
        const { classes, ridePage } = this.props;


        return (
          <div className={ridePage ? classes.rootRidePage : classes.root}>
              <DateRangePicker
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  startDateId="startDate" // PropTypes.string.isRequired,
                  endDate={this.state.endDate}// momentPropTypes.momentObj or null,
                  endDateId="endDate"// PropTypes.string.isRequired,
                  onDatesChange={this.datesUpdated} // PropTypes.func.isRequired,
                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                  isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}

              />

          </div>
        );
  }
}

export default withStyles(styles)(DatePicker);
