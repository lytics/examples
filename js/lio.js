
// window.jstag = function() {
//     var t = {
//             _q: [],
//             _c: {},
//             ts: (new Date()).getTime()
//         },
//         l = false,
//         w = window,
//         d = document,
//         src = "/static/io",
//         ext = ".min.js",
//         as = Array.prototype.slice,
//         js = "//c.lytics.io",
//         url = "//c.lytics.io",
//         tag = "io";
//     t.init = function(c) {
//         url = c.url || url;
//         ext = c.min === false ? ".js" : ext;
//         tag = c.tag || tag;
//         t._c = c;
//         return this;
//     };
//     t.load = function() {
//         var jsel, scriptEl = d.getElementsByTagName("script")[0];
//         l = true;
//         if (d.getElementById(src)) return this;
//         jsel = d.createElement("script");
//         src = js + "/static/" + tag + ext;
//         jsel.id = src;
//         jsel.src = src;
//         scriptEl.parentNode.insertBefore(jsel, scriptEl);
//         return this;
//     };
//     t.bind = function(e) {
//         if (!l) this.load();
//         this._q.push([e, as.call(arguments, 1)]);
//     };
//     t.ready = function() {
//         if (!l) this.load();
//         this._q.push(["ready", as.call(arguments)]);
//     };
//     t.send = function() {
//         if (!l) this.load();
//         this._q.push(["ready", "send", as.call(arguments)]);
//         return this;
//     };
//     return t;
// }();

// window.jstag.init({ cid: "1896", url:'//c.lytics.io', min:false });

// if(typeof window.liosetup !== 'undefined' && window.liosetup.stream !== undefined){
//     window.jstag.send(window.liosetup.stream, {});
// }else{
//     window.jstag.send();
// }

var ly_cid = "1896";

(function(d, w) {
  // version management
  // v0.0.1 - google analytics dimension param naming change
  if(w.liosetup && w.liosetup.dimension){
    w.liosetup.gaDimension = w.liosetup.dimension;
  }
  if(w.liosetup && w.liosetup.gaDimension){
    w.liosetup.gaSegmentDimension = w.liosetup.gaDimension;
  }

  w.lio = {
    loaded: false,
    lychunk: "",
    cookie: d.cookie,
    data: {},
    segmentsCookie: {},
    segmentsHash: {},
    segmentsString: "",
    integrations: { // monitor the status of integration responses [ 200:success, 201:validated (if necessary) 0:na, 500:failed, 400:missing]
      optimizely: 0,
      googleAnalyticsDimension: 0,
      googleAnalyticsUserDimension: 0,
      googleAnalyticsUserid: 0,
      facebookAds: 0,
      addthis: 0
      // qualaroo: 0,
      // adroll: 0,
    },
    integrationTicker: null,       // becomes the loop ticker
    integrationTickerPace: 100,    // try every 100ms
    integrationCounter: 0,         // counts loop iterations
    integrationCounterMax: 600,    // retry every 100 ms for 30 seconds
    debug: !!w.liosetup && w.liosetup.debug,
    debugMsgs: [],
    addDebugMessage: function(m) {
      w.lio.debugMsgs.push(m);
    },
    checkIntegrations: function() {
      w.lio.integrationCounter++;

      // optimizely: customTags must be pushed in prior to loading the optimizely tag, if tag already exists fail forever
      if(w.lio.integrations.optimizely === 0){
        if(w.optimizely){
          w.lio.addDebugMessage("Optimizely loaded before Lytics. Unable to push segments.");
          w.lio.integrations.optimizely = 501;
        }else{
          w.optimizely = w.optimizely || [];
          w.optimizely.push(["customTag", w.lio.segmentsCookie]);
          w.optimizely.push(["activate"]);
          w.lio.integrations.optimizely = 201;
        }
      }
      // optimizely is unique in that we have to push our audiences before their tag loads, the following will validate that they
      // have in fact received the audiences passed above for fail
      if(w.lio.integrations.optimizely === 201){
        if(w.optimizely && w.optimizely.data && w.optimizely.data.customTags){
          w.lio.integrations.optimizely = 200;
        }else if(w.lio.integrationCounter >= w.lio.integrationCounterMax){
          w.lio.addDebugMessage("Lytics segments failed to load in Optimizely.");
          w.lio.integrations.optimizely = 500;
        }
      }

      // facebook ads: the facebook ads tag must be initialized before our tag, try until it exists or we hit max fail count
      if(w.lio.integrations.facebookAds === 0 && w.lio.segmentsCookie){
        if(w._fbq){
          w._fbq = w._fbq || [];
          var lh = {};

          // facebook only accepts strings as the value so we must use string of true here
          for (var p in w.lio.segmentsCookie) { if(p !== "" && p !== "not_found"){lh[p] = "true";}}
          w._fbq.push(["track", "Lytics Audiences", lh]);
          w.lio.integrations.facebookAds = 200;
        }else if(w.lio.integrationCounter >= w.lio.integrationCounterMax){
          w.lio.addDebugMessage("Unable to add Facebook audience.");
          w.lio.integrations.facebookAds = 500;
        }
      }

      // google analytics: the google analtyics tag must be initialized before our tag, try until it exists or we hit max fail count
      if(w.lio.integrations.googleAnalyticsDimension === 0){
        if(w.ga && w.liosetup && w.liosetup.gaSegmentDimension){
          w.ga('set', w.liosetup.gaSegmentDimension, w.lio.segmentsString);
          w.lio.integrations.googleAnalyticsDimension = 200;
        }else if(w.lio.integrationCounter >= w.lio.integrationCounterMax){
          if(w.liosetup && w.liosetup.gaSegmentDimension){
            w.lio.addDebugMessage("Unable to process google analytics custom dimension.");
            w.lio.integrations.googleAnalyticsDimension = 500;
          }
        }
      }
      if(w.lio.integrations.googleAnalyticsUserDimension === 0){
        if(w.ga && w.liosetup && w.liosetup.gaUserDimension){
          w.ga('set', w.liosetup.gaUserDimension, w.lio._uid);
          w.lio.integrations.googleAnalyticsUserDimension = 200;
        }else if(w.lio.integrationCounter >= w.lio.integrationCounterMax){
          if(w.liosetup && w.liosetup.gaUserDimension){
            w.lio.addDebugMessage("Unable to process google analytics custom user dimension.");
            w.lio.integrations.googleAnalyticsUserDimension = 500;
          }
        }
      }
      if(w.lio.integrations.googleAnalyticsUserid === 0){
        if(w.ga && w.liosetup && w.liosetup.gaUserId){
          w.ga('set', '&uid', w.lio.getCookie("seerid"));
          w.lio.integrations.googleAnalyticsUserid = 200;
        }else if(w.lio.integrationCounter >= w.lio.integrationCounterMax){
          if(w.liosetup && w.liosetup.gaUserId){
            w.lio.addDebugMessage("Unable to process google analytics user id.");
            w.lio.integrations.googleAnalyticsUserid = 500;
          }
        }
      }

      // addthis: the addthis tag must be initialized before our tag, try until it exists or we hit max fail count
      if(w.lio.integrations.addthis === 0 && w.lio.segmentsCookie){
        if(w.addthis){
          var ckParts,
              ckNew = [];

          if(w.lio.getCookie('__attag')){
            ckParts = w.lio.getCookie('__attag').split(',');

            // remove the old segments from the cookie
            for (var i = 0; i < ckParts.length; i++) {
                if( ckParts[i].indexOf("lio:") > -1 ){
                  // do nothing, we are removing all of the lytics segment slugs
                }else{
                  ckNew.push(ckParts[i]);
                }
            }

            // add the current segments to the cookie in order to keep our tags updated without
            // disturbing other params passed outside of lytics we append lio: to each segment slug
            for (var lioKey in w.lio.segmentsCookie) {
              ckNew.push('lio:'+lioKey);
            }
            w.lio.setCookie('__attag', ckNew.join(), '43829'); // 4829 = one month
          }

          for (var s in w.lio.segmentsCookie) {
            if(s !== "" && s !== "not_found"){
              w.addthis.user.tag('lio:' + s);
            }
          }
          w.lio.integrations.addthis = 200;
        }else if(w.lio.integrationCounter >= w.lio.integrationCounterMax){
          w.lio.addDebugMessage("Unable to add addthis segments.");
          w.lio.integrations.addthis = 500;
        }
      }


      // hidden by default but handy to make sure we aren't checking too often
      if(w.lio.debug && !(w.lio.integrationCounter % 10)){
        console.log("tick...");
      }

      // if debug is on then output each of the error messages
      if(w.lio.integrationCounter >= w.lio.integrationCounterMax){
        clearInterval(w.lio.integrationTicker);
        if(w.lio.debug){
          if(!w.lio.debugMsgs.length){
            console.log("lytics integration completed without errors.");
          }else{
            for(var i = 0; i < w.lio.debugMsgs.length; i++){
              console.log(w.lio.debugMsgs[i]);
            }
          }
        }
      }
    },
    setCookie: function(name, value, minutes) {
      var date = new Date();
      date.setTime(date.getTime() + (minutes * 60 * 1000));

      var expires = "expires=" + date.toUTCString();
      d.cookie = name + "=" + value + "; " + expires;
    },
    getCookie: function(name){
      var re = new RegExp(name + "=([^;]+)");
      var value = re.exec(w.lio.cookie);
      var output = (value !== null) ? unescape(value[1]) : undefined;

      return output;
    },
    _uid: null,
    // helper method to determine if user is member of segment
    inSegment: function(seg){
      return !!window.lio.segmentsHash[seg];
    },
    // prepares all the lio data elements for hiding / showing based on membership
    prepElements: function(attr){
      var lioDataElements = {},
        lioGroup,
        lioType,
        lioTrigger;

      if(!w.lio.lioElements){
        w.lio.lioElements = document.getElementsByTagName('*');
      }

      var lioElements = w.lio.lioElements;
      for (var i = 0, n = lioElements.length; i < n; i++) {
        if (lioElements[i].getAttribute(attr) !== null) {
          var theElement = lioElements[i];
          lioGroup = theElement.getAttribute('data-liogroup');
          lioType = theElement.getAttribute('data-liotype');
          lioTrigger = theElement.getAttribute('data-liotrigger');

          if(!lioGroup){
            lioGroup = "default";
          }

          if(!lioDataElements[lioGroup]){
            lioDataElements[lioGroup] = [];
          }

          lioDataElements[lioGroup].push({
            elem: theElement,
            displayType: theElement.style.display,
            group: lioGroup,
            type: lioType,
            trigger: lioTrigger
          });
        }
      }

      return lioDataElements;
    },
    // processes all elements with a lio attribute data-liotrigger
    procElements: function(){
      // !!! ADD PREPPED ELEMENTS !!!
      w.lio.peppedElements = w.lio.prepElements('data-liotrigger');
      var elementObj = w.lio.prepElements('data-liotrigger');

      for (var key in elementObj) {
        var matched = false;
        var defaultEl = {};

        for (var i = 0, n = elementObj[key].length; i < n; i++){
          var singleElementObj = elementObj[key][i];

          // if we find a match show that and prevent others from showing in same group
          if(w.lio.inSegment(singleElementObj.trigger) && !matched){
            singleElementObj.elem.removeAttribute("data-liotrigger");

            if(key !== "default"){
              matched = true;
              continue;
            }
          }

          // if this is the default save it
          if(singleElementObj.trigger == "default"){
            defaultEl = singleElementObj;
          }
        }

        // if nothing matched show default
        if(!matched && key != "default"){
          defaultEl.elem.removeAttribute("data-liotrigger");
        }
      }
    },
    keysForObject: Object.keys || function(obj) {
      var keys = [];

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          keys.push(i);
        }
      }

      return keys;
    },
    hasDOMContentLoaded: false,
    DOMready: false,
    DOMreadyMethod: null,
    segmentscb: function(json) {
      if (json.data && json.data.segments) {
        var segList = json.data.segments;
        for (var i = segList.length - 1; i >= 0; i--) {
          w.lio.segmentsHash[segList[i]] = segList[i];
        }
        w.lio.segmentsCookie = w.lio.segmentsHash;
        w.lio.segmentsString = w.lio.keysForObject(w.lio.segmentsHash).toString().replace(/,+/g, ',');
        w.lio.setCookie("ly_segs", JSON.stringify(w.lio.segmentsHash), 15);
        w.lio.data = json.data;

        // mock propensity
        w.lio.data.propensity = window.user.propensity || 0.00;

        if(document.addEventListener){
          // Listen for "DOMContentLoaded"
          document.addEventListener("DOMContentLoaded", function(event) {
              w.lio.hasDOMContentLoaded = true;
              w.lio.initLioDOM("DOMContentLoaded", json.data);
          });

          // Listen for "load"
          document.addEventListener("load", function(event) { w.lio.initLioDOM("load", json.data); });
        }

        // Listen for "onreadystatechange"
        document.onreadystatechange = function () { w.lio.initLioDOM("onreadystatechange", json.data); }
      }

      w.lio.loaded = true;

      // start integration check, check immediately then every 100ms thereafter
      w.lio.checkIntegrations();
      w.lio.integrationTicker = setInterval(w.lio.checkIntegrations, w.lio.integrationTickerPace);
    },
    initLioDOM: function(method, data) {
      if(!w.lio.DOMready) {
        w.lio.DOMready = true;
        w.lio.DOMreadyMethod = method;

        w.lio.procElements();
        w.liosetup && w.liosetup.callback && w.liosetup.callback(data);
      }
    }
  };

  w.lio._uid = w.lio.getCookie("seerid");

  if (w.lio.getCookie("ly_segs")) {
    w.lio.segmentsCookie = JSON.parse(w.lio.getCookie("ly_segs"));
  }

  if(w.liosetup && w.liosetup.field && w.liosetup.value){
    if(!w.liosetup.field){
      w.lio.addDebugMessage("Field is blank, Lytics audiences will not be loaded.");
    }

    if(!w.liosetup.value){
      w.lio.addDebugMessage("Value is blank, Lytics audiences will not be loaded.");
    }

    w.lio.lychunk = w.ly_cid + "/" + w.liosetup.field + "/" + w.liosetup.value;
  } else {
    w.lio.lychunk = w.ly_cid + "/" + w.lio.getCookie("seerid");
  }

  // w.lio.ieDetect = navigator.userAgent.toLowerCase();
  // if(w.lio.ieDetect.indexOf('msie') != -1){
  //   w.lio.ieVersion = parseInt(w.lio.ieDetect.split('msie')[1]);
  //   w.lio.isIe = true;
  // }else{
  //   w.lio.ieVersion = 0;
  //   w.lio.isIe = false;
  // }

  // for our automatic element handling we need to ensure they are all hidden by default
  // so do that.
  var css = '[data-liotrigger]{ display: none; }';
  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) { // handle ie
      style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName('head')[0].appendChild(style);

  // add the core public entity javascript (json)
  // !!! ADD FIELDS !!!
  var apiurl = "https://api.lytics.io/api/me/" + w.lio.lychunk + "?fields=" + w.liosetup.fields + "&callback=window.lio.segmentscb";
  d.write('\x3Cscript type="text/javascript" src="' + apiurl + '">\x3C/script>');
}(document, window));
