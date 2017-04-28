(function(d, w) {
    // initialize googletag
    w.googletag = w.googletag || {};
    w.googletag.cmd = w.googletag.cmd || [];

    // disable initial load
    if(typeof w.googletag !== 'undefined'){
        w.googletag.cmd.push(function() {
            w.googletag.pubads().disableInitialLoad();
        });
    }else{
        console.warn('attempting to load Lytics for DFP before initializing googletag')
    }

    // get segments and activate ads
    w.liosetup.addEntityLoadedCallback(function(data){
        if(data && data.segments){
          w.googletag.cmd.push(function() {
            w.googletag.pubads().setTargeting("LyticsSegments", data.segments);
            w.googletag.pubads().refresh();
          });
        }else{
          console.warn('unable to load Lytics audiences for DFP')
          w.googletag.pubads().refresh();
        }
    });
}(document, window));