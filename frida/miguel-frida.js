/* https://stackoverflow.com/a/57474349 */
var printBacktrace = function () {

    Java.perform (function () {

        var JLog = Java.use ('android.util.Log'), JException = Java.use ('java.lang.Exception');
        // getting stacktrace by throwing an exception
        console.warn (JLog.getStackTraceString (JException.$new ()));

    });

};


Java.perform (function () {

    var textView_cls = Java.use ("android.widget.TextView");
    var str_cls = Java.use ("java.lang.String");

    /* Remove blurred images */
    var blurMask = Java.use ("jp.wasabeef.glide.transformations.internal.FastBlur");
    blurMask.blur.implementation = function (sent, radius, canReuse) {
            return sent;
    };

    /* Change number of likes on the golden pill at the top */
    var likes_cls = Java.use ("com.tinder.goldhome.mapper.GoldHomeTextCountMapper");
    likes_cls.map.overload ("int").implementation = function (count) {

        return str_cls.$new ("+9000");
    };

    /* Change number of likes on the "likes you" (fastMatch?) view */
    var c_GoldHomeFragmentState = Java.use ("com.tinder.goldhome.datamodels.GoldHomeFragmentState");
    c_GoldHomeFragmentState.getLikesYouCount.overload ().implementation = function () {

        var retVal = this.getLikesYouCount ();
        console.log ("Real 'likes you' count: " + retVal);
        return 999;
    }

}
);
