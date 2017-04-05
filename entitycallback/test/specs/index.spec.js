// *************************************************
// test legacy format
// *************************************************
describe('ensure we handle callbacks that exist as single function', function () {
  it('should have liosetup initialized and no callbacks registered', function () {
    expect(typeof window.liosetup === 'object').toBe(true);
    expect(typeof window.liosetup.callback === 'object').toBe(true);
    expect(window.liosetup.callback.length).toEqual(0);
  });

  it('should add the pre-existing callback as the first item of the new array', function () {
    // set legacy style callback
    window.liosetup.callback = function(cb){ cb('example1'); }

    // set new style callback
    window.liosetup.addEntityLoadedCallback(function(cb){ cb('example2'); }, false)

    // check callbacks
    window.liosetup.callback[0](function(d){
        expect(d).toEqual('example1');
    })
    window.liosetup.callback[1](function(d){
        expect(d).toEqual('example2');
    })

    // set new style callback and append to front
    window.liosetup.addEntityLoadedCallback(function(cb){ cb('example3'); }, true)
    window.liosetup.callback[0](function(d){
        expect(d).toEqual('example3');
    })
  });
});

// *************************************************
// test current format
// *************************************************
describe('ensure we handle callbacks that exist as array', function () {
  it('should have liosetup initialized and no callbacks registered', function () {
    window.liosetup.callback = [];
    expect(window.liosetup.callback.length).toEqual(0);
  });

  it('should add the pre-existing callback as the first item of the new array', function () {
    window.liosetup.callback = [
        function(cb){
            cb('example1');
        }
    ]
    // set new style callback
    window.liosetup.addEntityLoadedCallback(function(cb){ cb('example2'); }, false)

    // check callbacks
    window.liosetup.callback[0](function(d){
        expect(d).toEqual('example1');
    })
    window.liosetup.callback[1](function(d){
        expect(d).toEqual('example2');
    })

    // set new style callback and append to front
    window.liosetup.addEntityLoadedCallback(function(cb){ cb('example3'); }, true)
    window.liosetup.callback[0](function(d){
        expect(d).toEqual('example3');
    })
  });
});