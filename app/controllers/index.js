import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { run } from '@ember/runloop';

export default Controller.extend({

  amountNeeded: computed('model.event.totalDonationSum', function() {
    let needed = 0;
    if (this.get('model.event.goal') >= this.get('model.event.totalDonationSum')) {
      needed = this.get('model.event.goal') - this.get('model.event.totalDonationSum');
    }
    return needed;
  }),

  amountAchievedWidthClass: computed('amountNeeded', function() {
    let width = 100;
    const calculatedWidth = this.get('model.event.totalDonationSum')/this.get('model.event.goal') * 100;

    if (calculatedWidth < 100) {
      width = calculatedWidth;
    }

    let str = htmlSafe(`width: ${width}%`);
    if (width === 100) {
      str = htmlSafe(`width: ${width}%; border-top-right-radius: 8px;`);
    }
    return str;
  }),

  actions: {
    submitDonation() {
      const total = this.get('model.event.totalDonationSum');
      const newDonation = parseInt(this.get('model.donationValue'));
      const donorAmount = this.get('model.event.totalDonors');

      if (newDonation >= 5) {
        this.set('model.event.totalDonationSum', total + newDonation);
        this.set('model.event.totalDonors', donorAmount + 1);
        this.set('model.donationValue', 0);
        this.handleFlashMessage('flash-message-success', 'Thank you for your kind donation!');
      } else {
        this.handleFlashMessage('flash-message-error', 'Our minimum donation is $5. Please try again.');
      }
    }
  },

  handleFlashMessage(cssClass, message) {
    this.set('flashMessage', { cssClass: cssClass, message: message });
    let controller = this;
    run.later((function() {
      controller.set('flashMessage', null);
    }), 2000);
  }
});
