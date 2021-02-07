console.log ("[frida-gadget]: HEYYYYYYYY!!!!");

rpc.exports = {

    init: function (stage, params) {

        console.log ("[frida-gadget] @init():", stage, JSON.stringify (parameters));

    },
    dispose: function () {

        console.log ("[frida-gadget] @dispose()");
    }
};


Java.perform (function () {

    /* Remove blurred images */
    var blurMask = Java.use ("jp.wasabeef.glide.transformations.internal.FastBlur");
    blurMask.blur.implementation = function (sent, radius, canReuse) {
            return sent;
    };

    /* Change number of likes */
/*
    var likesClass = Java.use ("com.tinder.ui.views.FastMatchPillView");

    likesClass.getLikeCountText.implementation = function () {

        console.log ("Dentro de getLikeCountText ()");
            var textView = this.getLikeCountText ();

        console.log (textView);
//            textView.setText ("99");

        console.log ("Brooklyn 99!");
        return textView;
    };
*/
}
);

/* https://github.com/iddoeldor/frida-snippets */
/*
Java.perform(() => {
	var Location = Java.use('android.location.Location');
	Location.getLatitude.implementation = function() {
		return 59.3251172;
	}
	Location.getLongitude.implementation = function() {
		return 18.0710935;
	}
})
*/
