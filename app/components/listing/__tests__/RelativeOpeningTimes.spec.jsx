import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { RelativeOpeningTime } from '../RelativeOpeningTime';
import { ListingDebugPage, simpleScheduleLookup } from '../../../pages/debug/ListingDemoPage';

// console.log(ListingDebugPage.createScheduleFromShorthand(simpleSchedules));

describe('<RelativeOpeningTimes />', () => {
  const getNamedSchedule = (name) => ListingDebugPage
    .createScheduleFromShorthand([simpleScheduleLookup[name]])[0];

  it('should display "open 24/7" for a schedule with every day open', () => {
    const schedule = getNamedSchedule('twenty_four_seven');
    const comp = shallow(<RelativeOpeningTime schedule={schedule} />);
    expect(comp.find('.relative-opening-time').text()).to.equal('Open 24/7');
    expect(comp.find('.relative-opening-time').hasClass('status-green')).to.be.true;
  });

  it('should display "Open 24h today" for a schedule with 0-2359 today and less than 7 days open 24/7', () => {
    const schedule = getNamedSchedule('twenty_four_hours_today');
    const comp = shallow(<RelativeOpeningTime schedule={schedule} />);
    expect(comp.find('.relative-opening-time').text()).to.equal('Open 24h today');
    expect(comp.find('.relative-opening-time').hasClass('status-green')).to.be.true;
  });

  it('should display "closed today" if there are no hours today', () => {
    const schedule = getNamedSchedule('closed_today');
    const comp = shallow(<RelativeOpeningTime schedule={schedule} />);
    expect(comp.find('.relative-opening-time').text()).to.equal('Closed Today');
    expect(comp.find('.relative-opening-time').hasClass('status-red')).to.be.true;
  });

  it('should display "Closed until tomorrow" for a schedule that is closed until tomorrow', () => {
    const date = new Date();
    date.setHours(18);
    date.setMinutes(15);
    const schedule = getNamedSchedule('nine_to_six');
    const comp = shallow(<RelativeOpeningTime schedule={schedule} currentDate={date} />);
    expect(comp.find('.relative-opening-time').text()).to.equal('Closed Until Tomorrow');
    expect(comp.find('.relative-opening-time').hasClass('status-red')).to.be.true;
  })

  it('should display "Opens in 5 minutes" for a schedule that is just about to open', () => {
    const date = new Date();
    date.setHours(8);
    date.setMinutes(55);
    const schedule = getNamedSchedule('nine_to_six');
    const comp = shallow(<RelativeOpeningTime schedule={schedule} currentDate={date} />);
    expect(comp.find('.relative-opening-time').text()).to.equal('Opens in 5 mins');
    expect(comp.find('.relative-opening-time').hasClass('status-amber')).to.be.true;
  });

  it('should display "Closes in 10 minutes" for a schedule that is just about to close', () => {
    const date = new Date();
    date.setHours(17);
    date.setMinutes(50);
    const schedule = getNamedSchedule('nine_to_six');
    const comp = shallow(<RelativeOpeningTime schedule={schedule} currentDate={date} />);
    expect(comp.find('.relative-opening-time').text()).to.equal('Closes in 10 mins');
    expect(comp.find('.relative-opening-time').hasClass('status-amber')).to.be.true;
  });
});
