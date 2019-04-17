import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      event: {
        daysLeft: 4,
        totalDonors: 11,
        goal: 5000
      },
      donationValue: 0
    }
  }
});
