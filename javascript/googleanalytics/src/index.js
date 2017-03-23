
// MUST REMOVE ga('send', 'pageview'); LINE FROM DEFAULT GA TAG
(function(d, w) {
    var setLyticsDimensionsAndPageView = function(data){
        ga(function() {
            var trackers = ga.getAll(),
                trackingIds = [];

            for (var i = 0, len = trackers.length; i < len; i++) {
              var id = trackers[i].get('trackingId'),
                  name = trackers[i].get('name');

              id && trackingIds.push({"name":name, "id":id});
            }

            for (i = 0; i < w.lio.integrationsConfig.googleAdsIntegration.length; i++) {
              var integrationsConfig = w.lio.integrationsConfig.googleAdsIntegration[i];

              for (var j = 0; j < trackingIds.length; j++) {
                if(integrationsConfig.web_property === trackingIds[j].id){
                  var name = trackingIds[j].name;
                  w.ga(name + '.require', 'displayfeatures');
                  w.ga(name + '.set', integrationsConfig.segments_dimension, w.lio.segmentsString);
                  w.ga(name + '.set', integrationsConfig.user_id_dimension, w.lio._uid);
                  ga('send', 'pageview');
                }
              }
            }
        });
    }

    // add the callback
    w.liosetup.callback = setLyticsDimensionsAndPageView;
}(document, window));