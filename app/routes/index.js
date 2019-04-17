import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      event: {
        daysLeft: 'four',
        totalDonors: 0,
        goal: 5000,
        totalDonationSum: 0
      },
      donationValue: 0
    }
  }
});
