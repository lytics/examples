window.lio = {
  segmentsString: 'all,cool_people',
  _uid: '12345.67890',
  integrationsConfig: {
    googleAdsIntegration: [
      {
        "web_property":"UA-12345678-0",
        "segments_dimension":"dimension1",
        "user_id_dimension":"dimension2"
      }
    ]
  }
}

describe('ensure we set dimensions and queue events to ga properly', function () {
  it('should have the ga object loaded from library', function () {
    expect(typeof window.ga === 'function').toBe(true);
    expect(ga.getAll().length).toEqual(0);
  });

  it('should initialize an account and add a lytics callback', function () {
    ga('create', 'UA-12345678-0', 'auto');
    expect(ga.getAll().length).toEqual(1);
    expect(ga.getAll()[0].get('trackingId')).toEqual('UA-12345678-0');
    expect(liosetup.callback.length).toEqual(1);
  });

  it('should add the segment and user dimensions when the lytics callback is fired', function () {
    liosetup.callback[0]({
      segments:[
        "all",
        "cool_people"
      ]
    });
    expect(ga.getAll()[0].get('dimension1')).toEqual('all,cool_people');
    expect(ga.getAll()[0].get('dimension2')).toEqual('12345.67890');
  });
});