import React from 'react';
import PropTypes from 'prop-types';
import AppointmentForm from './AppointmentForm';
import {AppointmentsList} from './AppointmentsList';
import update from 'immutability-helper';

export default class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }
  constructor(props, _railsContext) {
    super(props)
    console.log(props);
    this.state = {
      appointments: this.props.appointments
    }

  }
  static defaultProps = {
    appointments: []
  }

  componentDidMount () {

    $.ajax({
     type: "GET",
     url: '/appointments',
     dataType: "JSON"
    }).done((data) => {
     this.setState({appointments: data});
    });

  }



  addNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments, {$push: [appointment]});
    this.setState({
      appointments: appointments.sort(function(a, b) {
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  }

  render() {
    return (
      <div>

        <AppointmentForm handleNewAppointment={this.addNewAppointment} />
        <AppointmentsList appointments={this.state.appointments}/>
      </div>
    )
  }
}
