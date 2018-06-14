(function(window, document) {

    window.Polymer = {
        dom: 'shadow', //current default shady will leak css from above
        lazyRegister: true
    };

    var token = document.currentScript.getAttribute('token') || '';
    var bid = document.currentScript.getAttribute('aid') || document.currentScript.getAttribute('bid') || '';

    //disable requirejs
    var script = document.createElement('script');
    script.src = '__widgetUrl/disable-rj.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    var script = document.createElement('script');
    script.src = '__widgetUrl/bower_components/webcomponentsjs/webcomponents-lite.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    //load this after everything else
    window.onload = function(e) {
        var script = document.createElement('script');
        script.src = '__widgetUrl/analytics-client.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    var elem = document.createElement('link');
    elem.rel = 'import';
    elem.href = '__widgetUrl/elements/convospot-launcher.html';
    elem.crossorigin = 'anonymous';
    document.getElementsByTagName('head')[0].appendChild(elem);


    // create a container
    var comp = document.createElement('convospot-launcher');
    comp.setAttribute('token', token);
    comp.setAttribute('bid', bid);
    document.getElementsByTagName('body')[0].appendChild(comp);

    // a function for custom button
    // TODO: change to window.convospot.showSidebar...
    window.showConvospot = function() {
        var sidebar = document.querySelector('convospot-launcher');
        if (sidebar) {
            sidebar.setAttribute('show-sidebar', false); //must reset
            sidebar.setAttribute('show-sidebar', true);
            return true;
        }
        return false;
    };

    //version no here

}(window, document))