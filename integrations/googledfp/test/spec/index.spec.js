// mock googletag
function GoogleTagMock() {
  return;
}
GoogleTagMock.prototype = {
  enabled: true,
  target: {},
  refreshCount: 0,
  cmd: window.googletag.cmd || [],
  pubads: function(d) {
    this.value = d;
    return this;
  },
  disableInitialLoad: function() {
    this.enabled = false;
    return this;
  },
  setTargeting: function(key, value) {
    this.target[key] = value;
    return this;
  },
  refresh: function() {
    this.refreshCount = this.refreshCount + 1;
    return this;
  }
};

// *************************************************
// test legacy format
// *************************************************
describe('ensure we handle callbacks that exist as single function', function () {
  beforeAll(function() {
    window.googletag = new GoogleTagMock();
  });

  it('should have loaded the callback helper from this library', function () {
    expect(typeof window.liosetup === 'object').toBe(true);
    expect(Array.isArray(window.liosetup.callback)).toBe(true);
    expect(window.liosetup.callback.length).toEqual(1);
  });

  it('should have established googletag and googletag command if it did not exist', function () {
    expect(typeof window.googletag === 'object').toBe(true);
    expect(Array.isArray(window.googletag.cmd)).toBe(true);
    expect(window.googletag.enabled).toBe(true);
  });

  it('should have pushed the disableIniitalLoad to the cmd array', function () {
    // check that function exists
    expect(window.googletag.cmd.length).toBe(1);

    // run the function to ensure it works
    window.googletag.cmd[0]()
    expect(window.googletag.enabled).toBe(false);
  });

  it('should pass lytics segments to dfp upon callback', function () {
    // check that we have a defined callback
    expect(window.liosetup.callback.length).toBe(1);

    // manually run the callback to test the output
    window.liosetup.callback[0]({
      segments:[
        "all",
        "cool_people"
      ]
    });
    expect(window.googletag.cmd.length).toBe(2);

    // run the cmd function manually to test that we pushed the right things
    window.googletag.cmd[1]();
    expect(window.googletag.refreshCount).toEqual(1);
    expect(Object.keys(window.googletag.target)[0]).toEqual('LyticsSegments');
    expect(window.googletag.target.LyticsSegments.indexOf("all") > -1).toBe(true);
    expect(window.googletag.target.LyticsSegments.indexOf("cool_people") > -1).toBe(true);
    expect(window.googletag.target.LyticsSegments.indexOf("nope") > -1).toBe(false);
  });

  it('should fail gracefully', function () {
    window.liosetup.callback[0]();
    expect(window.googletag.refreshCount).toEqual(2);
  });
});