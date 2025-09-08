polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  useragent: Ember.computed.alias('details.useragent')
});
