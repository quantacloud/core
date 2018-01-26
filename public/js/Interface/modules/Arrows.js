// Arrows module. Loaded in window.onload()
var Arrows = (function() {
    // Private
    var lastSelected = '';
    var tree = null;
    var row = null;
    var max = 0;
    var i = 0;
    var init = false;

    // Public
    return {
        init : function() {
            tree = $('#tree');
            if($(tree).length === 0) return false;
            row = $(tree).find('tr:not(#tree_head)');
            if($(row).length === 0) return false;
            max = $(row).length-1;
            i = 0;
            lastSelected = '';
            init = true;
        },

        up : function(ctrl = null) {
            if(!init) return false;
            if(Selection.Files.length === 0 && Selection.Folders.length === 0 && lastSelected === '') {
                i = max; // last element
			} else if(i <= 0) {
                i = max;
			} else {
                i--;
			}
            lastSelected = $(row)[i].id;

            if(ctrl === null) { // remove previous selected element(s)
                Selection.remove();
			}
            Selection.add(lastSelected, ctrl);

            Arrows.scroll($(row)[i]);
        },

        down : function(ctrl = null) {
            if(!init) return false;
            if(Selection.Files.length === 0 && Selection.Folders.length === 0 && lastSelected === '') {
                i = 0; // first element
			} else if(i >= max) {
                i = 0;
			} else {
                i++;
			}
            lastSelected = $(row)[i].id;

            if(ctrl === undefined) { // remove previous selected element(s)
                Selection.remove();
			}
            Selection.add(lastSelected, ctrl);

            Arrows.scroll($(row)[i]);
        },

        scroll : function(el) {
            // Autoscroll
            var l = window.innerWidth || document.body.clientWidth;
            document.body.scrollTop = el.offsetTop - 90;
        }
    }
});
