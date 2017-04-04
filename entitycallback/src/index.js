(function(d, w) {
    // add lytics callback
    w.liosetup = w.liosetup || {};
    w.liosetup.callback = w.liosetup.callback || [];
    w.liosetup.addEntityLoadedCallback = function(fn, front){
        // handle legacy function callback cleanup
        if(typeof w.liosetup.callback === 'function'){
            var arr = [];
            arr.push(w.liosetup.callback);
            w.liosetup.callback = arr;
        }

        // check if lytics is loaded
        if(w.lio && w.lio.loaded){
            fn(w.lio.data);
        }else{
            if(front){
                w.liosetup.callback.unshift(fn);
            }else{
                w.liosetup.callback.push(fn);
            }
        }
    }
}(document, window));