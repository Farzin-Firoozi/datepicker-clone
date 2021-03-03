import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { persianNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';
import { months } from '../utils/months';
import moment from "moment-jalaali"

export default class Heading extends Component {
  static propTypes = {
    month: PropTypes.object.isRequired,
    isGregorian: PropTypes.bool
  };

  static contextTypes = {
    styles: PropTypes.object,
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    setMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired,

  };

  handleMonthClick(event) {
    const { setCalendarMode } = this.context;
    event.preventDefault();
    setCalendarMode('monthSelector');
  }

  setMonth(val) {
    const { setMonth } = this.context
    const { month } = this.props

    const format = "MM-jYYYY"
    const date = moment(String(Number(val) + 1) + "-" + month.format("jYYYY"), format)
    setMonth(date)

  }

  setYear(val) {
    const { setMonth } = this.context
    const { month } = this.props

    const format = "MM-jYYYY"
    const date = moment(month.format("jMM") + "-" + val, format)
  
    setMonth(date)

  }

  render() {
    const { nextMonth, prevMonth, setMonth } = this.context;
    const { styles, month, years } = this.props;
    let selectYears = []

    if (years)
      selectYears = years
    else {
      const thisYear = moment().format("jYYYY")

      for (var i = thisYear; i >= Number(thisYear) - 10; i--) {
        selectYears.push(i)
      }
    }
    return (
      <div className={styles.heading}>
        <div className="selects">
          <select onChange={e => this.setMonth(e.target.value)}>
            {
              months.map(index => (
                <option value={index.value} selected={month.format("jM") == index.value + 1}>
                  {index.title}
                </option>
              ))
            }
          </select>
          <select onChange={e => this.setYear(e.target.value)}>
            {
              selectYears.map(index => (
                <option value={index} selected={month.format("jYYYY") == index}>
                  {persianNumber(index)}
                </option>
              ))
            }
          </select>
        </div>
        {/* <button className={styles.title} onClick={this.handleMonthClick.bind(this)}>
          {this.props.isGregorian
            ? month.locale('en').format('MMMM YYYY')
            : persianNumber(month.locale('fa').format('jMMMM jYYYY'))}
        </button> */}
        {this.props.timePicker}
        {/* {!this.props.isGregorian && (
          <React.Fragment>
            <button
              type="button"
              title="ماه قبل"
              className={styles.prev}
              onClick={prevMonth}
              dangerouslySetInnerHTML={rightArrow}
            />
            <button
              type="button"
              title="ماه بعد"
              className={styles.next}
              onClick={nextMonth}
              dangerouslySetInnerHTML={leftArrow}
            />
          </React.Fragment>
        )} */}
        {this.props.isGregorian && (
          <React.Fragment>
            <button
              type="button"
              title="previous month"
              className={styles.next}
              onClick={prevMonth}
              dangerouslySetInnerHTML={leftArrow}
            />
            <button
              type="button"
              title="next month"
              className={styles.prev}
              onClick={nextMonth}
              dangerouslySetInnerHTML={rightArrow}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
