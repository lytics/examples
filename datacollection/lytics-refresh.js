var refreshlytics = function(){
    if(typeof window.jstag !== 'undefined' && typeof window.lio !== 'undefined'){
        window.lio.integrationCounter = 0; // reset the integration ticker
        window.lio.hasEntity = false; // reset the has entity flag in order to reload entity

        // reset all of the individual client side integrations for reprocessing
        for (var key in window.lio.integrations) {
            if (!{}.hasOwnProperty.call(window.lio.integrations, key)) {
                continue;
            }

            // reset integration status
            window.lio.integrations[key] = 0;
        }

        // send page view event
        window.jstag.pageView();
        
        // pull in new entity and check all pull integrations again
        window.lio.checkPullIntegrations(function() {
            if(
                window.jstag
                && window.jstag.mock
                && window.jstag.config && window.jstag.config.blockload
                || window.jstag._c && window.jstag._c.blockload
            ) {
                window.jstag.mock(function(q){
                    window.lio.getEntity(q.data);
                });
            } else {
                window.lio.getEntity();
            }
        });
    }
}