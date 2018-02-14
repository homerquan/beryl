// node-analytics: client
// https://github.com/andrao/node-analytics
// MIT License

// ==============
// CLIENT OPTIONS
// ==============
var na_obj = {
    click_class: 'convospot_click',
    focus_class: 'convospot_focus',
    reach_class: 'convospot_reach',
    read_class: 'convospot_read'
};

// ==============
// APPLICATION
// ==============

//var na_socket;
var na_pause = {};

(function() {
    // init: complete na_obj
    na_obj.reaches = document.getElementsByClassName(na_obj.reach_class);
    na_obj.reach_data = [];
    na_obj.pauses = document.getElementsByClassName(na_obj.read_class);
    na_obj.pause_data = [];

    //when loading them, read meta head
    var pageIntention = document.head.querySelector("[name=convospot-intention]")?document.head.querySelector("[name=convospot-intention]").content:null;
    var pageEvent = document.head.querySelector("[name=convospot-event]")?document.head.querySelector("[name=convospot-event]").content:null;
    var pageUrl = window.location.href;
    na_emit('page', { id: pageUrl, event: pageEvent, intention: pageIntention });


    // Calibration
    addEvent(window, 'resize', function() {
        na_obj_calibrate()
    });
    na_obj_calibrate();

    // resolution
    na_emit('resolution', {event: 'resolution', width: window.innerWidth, height: window.innerHeight });

    // clicks
    var links = document.getElementsByClassName(na_obj.click_class);
    for (var i = 0; i < links.length; i++) {
        addEvent(links[i], 'click', function() {
            // has been clicked :: emit to server
            var id = this.link.id || ('click_link_' + this.i);
            var event = this.link.dataset.convospotEvent;
            var intention = this.link.dataset.convospotIntention;
            na_emit('click', { id: id, event: event, intention: intention });
            return true; //important to avoid interfere event popup
        }.bind({
            link: links[i],
            i: i
        }));
    }

    // focus
    var areas = document.getElementsByClassName(na_obj.focus_class);
    for (var i = 0; i < areas.length; i++) {
        addEvent(areas[i], 'focus', function() {
            // has been clicked :: emit to server
            var id = this.area.id || ('focus_area_' + this.i);
            var event = this.area.dataset.convospotEvent;
            var intention = this.area.dataset.convospotIntention;
            na_emit('focus', { id: id, event: event, intention: intention });
            return true; //important to avoid interfere event popup
        }.bind({
            area: areas[i],
            i: i
        }));
    }

    // reaches && pauses :: check with every scroll
    addEvent(window, 'scroll', function() {
        var h = window.innerHeight

        var r_Y = window.scrollY + 0.75 * h;
        for (var i = 0; i < na_obj.reaches.length; i++) {
            if (!na_obj.reach_data[i].past && r_Y > na_obj.reach_data[i].y) {
                // has been reached :: emit to server
                var id = na_obj.reaches[i].id || 'reach_point_' + i;
                var event = na_obj.reaches[i].dataset.convospotEvent;
                var intention = na_obj.reaches[i].dataset.convospotIntention;
                na_emit('reach', { id: id, event: event, intention: intention })

                // set as passed; only send once
                na_obj.reach_data[i].past = true
            }
        }

        // pauses: start from bottom to find which we're in;
        var p_Y = window.scrollY + 0.5 * h;

        for (var i = 0; i < na_obj.pauses.length; i++) {
            var obj = na_obj.pauses[i]

            // activate :: entry || exit
            if ((!na_pause.active ||
                    na_pause.active !== obj) &&
                p_Y > na_obj.pause_data[i].y_IN &&
                p_Y <= na_obj.pause_data[i].y_OUT) {

                // emit last pause
                if (na_pause.active) {
                    var id = na_pause.active.id || 'read_section_' + na_pause.index;

                    if (na_pause.t > 1) {
                        var event = na_pause.active.dataset.convospotEvent;
                        var intention = na_pause.active.dataset.convospotIntention;
                        na_emit('pause', { id: id, event: event, intention: intention, time: parseFloat(na_pause.t.toFixed(1)) });
                    }
                }

                // prepare next pause
                na_pause.active = obj;
                na_pause.index = i;
                na_pause.t = 0;

                break;
            }
        }
    });

    function addEvent(obj, type, fn) {
        // John Resig's addEvent : http://ejohn.org/projects/flexible-javascript-events/
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function() {
                obj['e' + type + fn](window.event);
            };
            obj.attachEvent('on' + type, obj[type + fn]);
            return true; //important to avoid block other event handler
        } else
            obj.addEventListener(type, fn);
    }
})();

function na_timer_start() {
    na_pause.timer = setInterval(function() {
        if (!na_pause.t) na_pause.t = 0;
        na_pause.t += 0.1;
    }, 100);
}

function na_obj_calibrate() {
    // Set reach y-offset values; change with resizing
    for (var i = 0; i < na_obj.reaches.length; i++) {
        var y = getOffset(na_obj.reaches[i])

        // create if yet instantiated
        if (!na_obj.reach_data[i]) {
            na_obj.reach_data[i] = {
                y: y,
                past: false
            }
        } else na_obj.reach_data[i].y = y;
    }

    for (var i = 0; i < na_obj.pauses.length; i++) {
        var ele = na_obj.pauses[i];
        var y = getOffset(ele);

        na_obj.pause_data[i] = {
            y_IN: y,
            y_OUT: y + ele.offsetHeight
        };
    }

    function getOffset(ele) {
        var yOffset = ele.offsetTop;
        var parent = ele.parentNode;

        while (parent.parentNode) {
            yOffset += parent.offsetTop;
            parent = parent.parentNode


            return yOffset;
        }
    }

}

function na_emit(service, data) {
    var ts = (new Date).getTime();
    if (data) {
        data.ts = ts;
        //send to widget, put int a buffer before its fully loaded
        PubSub.publish('convospot_analytics',data);
    }
   
}