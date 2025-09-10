polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  useragent: Ember.computed.alias('details.useragent'),
  state: Ember.computed.alias('block._state'),
  init() {
    if (!this.get('block._state')) {
      this.set('block._state', {});
      this.set('block._state.errorMessage', '');
      this.set('block._state.runningSearch', false);
    }

    this._super(...arguments);
  },
  actions: {
    runSearch: function () {
      const payload = {
        action: 'RUN_SEARCH',
        entity: this.get('block.entity')
      };
      this.set('state.runningSearch', true);
      this.sendIntegrationMessage(payload)
        .then((lookupResults) => {
          if (Array.isArray(lookupResults) && lookupResults.length > 0) {
            const firstResult = lookupResults[0];
            this.set('block.data.details.showSearchPrompt', false);
            if (firstResult.data !== null) {
              this.set('block.data', firstResult.data);
            } else {
              this.set('block.data.details.noResults', true);
              this.set('block.data.summary', ['No results']);
            }
          }
        })
        .catch((error) => {
          console.error(error);
          this.set('block._state.errorMessage', JSON.stringify(error, null, 2));
        })
        .finally(() => {
          this.set('state.runningSearch', false);
        });
    }
  }
});
