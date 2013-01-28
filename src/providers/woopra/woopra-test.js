!(function () {

    suite('Woopra');

    var event = 'event';

    var properties = {
        woop: 'ra'
    };

    var traits = {
        name      : 'Zeus',
        email     : 'zeus@segment.io'
    };

    // Initialize
    // ----------

    test('adds woopra tracking js on initialize', function (done) {
        expect(window._wpt).to.be(undefined);

        analytics.initialize({
            'Woopra' : {
                domain: 'test'
            }
        });
        expect(window._wpt).not.to.be(undefined);
        expect(analytics.providers[0].settings.domain).to.equal('test');

        // test actual loading
        expect(window._wpt._loaded).to.be(undefined);
        setTimeout(function () {
            expect(window._wpt._loaded).not.to.be(undefined);
            done();
        }, 1000);
    });


    // Identify
    // --------

    test('calls identify on identify', function () {
        var tspy = sinon.spy(window._wpt, 'track'),
            vspy = sinon.spy(window._wpt, 'addVisitorProperty');

        analytics.identify(null, traits);
        // woopra calls addVisitorProperty for each trait and then tracks
        expect(vspy.calledTwice).to.be(true);
        expect(tspy.called).to.be(true);

        vspy.restore();
        tspy.restore();
    });

    // Track
    // -----

    test('calls track on track', function () {
        var spy = sinon.spy(window._wpt, 'pushEvent');
        analytics.track(event, properties);
        // woopra adds the event name as special key "name"
        properties.name = event;
        expect(spy.calledWith(properties)).to.be(true);

        spy.restore();
    });


    // Pageview
    // --------

    test('calls track_pageview on pageview', function () {
        var spy = sinon.spy(window._wpt, 'trackPageview');
        analytics.pageview();
        expect(spy.called).to.be(true);

        spy.reset();
        analytics.pageview('/url');
        // woopra sends the url and pagetitle as dictionary
        expect(spy.calledWith(sinon.match({
            url: '/url'
        }))).to.be(true);

        spy.restore();
    });

}());
