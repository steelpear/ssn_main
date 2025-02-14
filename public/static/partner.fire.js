(function () {
    var appName = 'stellsPartner';
    if (!window.hasOwnProperty(appName)) {
        window[appName] = {
            queue_length: 0,
            cycle_num: 0
        };

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://stells.info/assets/partner.app.js?_=c6814712';
        try {
            document.body.appendChild(script);
        } catch (e) {
            // If script located in head:
            window.onload = function () {
                document.body.appendChild(script);
            };
        }
    }
    window[appName].queue_length++;
    window[appName].cycle_num = 0;
})();
