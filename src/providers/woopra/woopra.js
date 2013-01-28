
// Woopra
// --------
// [Documentation](http://www.woopra.com/docs/setup/javascript-tracking/)

analytics.addProvider('Woopra', {

    settings : {
        domain: null
    },


    // Initialize
    // ----------

    // Changes to the Woopra snippet:
    //
    // * Add `domain`
    // * Add woopraReady initialization
    initialize : function (settings) {
        var _wpt = window._wpt = window._wpt || [],
            _this = this;

        settings = analytics.utils.resolveSettings(settings, 'domain');
        analytics.utils.extend(this.settings, settings);

        // Pass settings directly to `init` as the second argument.
        window.woopraReady = function(tracker) {
            var i, a;
            tracker.setDomain(_this.settings.domain);
            for (i = 0; i < _wpt._e.length; i++) {
                a = _wpt._e[i];
                tracker[_wpt._e[i][0]].apply(tracker, Array.prototype.slice.call(a, 1));
            }
            window._wpt = tracker;
            window._wpt._loaded = true;
            return false;
        };

        (function (d) {
            var l, m, a, b, c;

            _wpt._e = [];
            a = function (f) {
                return function() {
                    _wpt._e.push([f].concat(Array.prototype.slice.call(arguments, 0)));
                };
            };
            b = ['addVisitorProperty', 'track', 'pushEvent', 'trackPageview'];
            for (c = 0; c < b.length; c++) {
                _wpt[b[c]] = a(b[c]);
            }
            l = d.createElement('script');
            l.async = true;
            l.src = ('https:' === d.location.protocol ? 'https:' : 'http:') + '//static.woopra.com/js/woopra.js';
            m = d.getElementsByTagName('script')[0];
            m.parentNode.insertBefore(l, m);
        })(document);

    },


    // Identify
    // --------

    identify : function (userId, traits) {
        var i;
        if (traits) {
            for (i in traits) {
                window._wpt.addVisitorProperty(i, traits[i]);
            }
        }
        window._wpt.track();
    },


    // Track
    // -----

    track : function (event, properties) {
        var _properties = properties;
        _properties.name = event;
        window._wpt.pushEvent(_properties);
    },


    // Pageview
    // --------

    pageview : function (url) {
        window._wpt.trackPageview({
            url: url,
            title: document.title
        });
    }

});


