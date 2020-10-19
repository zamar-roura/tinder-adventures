/* https://stackoverflow.com/a/57474349 */
var printBacktrace = function () {
    Java.perform (function () {
        var JLog = Java.use ('android.util.Log'), JException = Java.use ('java.lang.Exception');
        // getting stacktrace by throwing an exception
        console.warn (JLog.getStackTraceString (JException.$new ()));
    });
};




/**
 * Remove blur from images.
 */
Java.perform (function () {

    Java.use ("jp.wasabeef.glide.transformations.internal.FastBlur")
        .blur.overload ("android.graphics.Bitmap", "int", "boolean")
        .implementation = function (sent, radius, canReuse) {

            return sent;
        };
});

/**
 * Modifies the displayed number of likes.
 */
Java.perform (function () {

    var textView_cls = Java.use ("android.widget.TextView");
    var str_cls = Java.use ("java.lang.String");
    var likesyou_mod = 666;

    /**
     * Modifies globally the 'likesYou' count. Depending on where the data is presented,
     * the real number may change.
     *
     * The data is obtained via API:
     *      GET /v2/fast-match/count
     * Unfortunately, the limit is 99 likes. Beyond that, the response is always
     * the same:
     *      {"meta":{"status":200},"data":{"is_range":true,"count":99}}
     *
     * Therefore, we can only know the exact number of likes up to 99.
     *
     *
     * Param0: int
     *          Number of likes (text to display later)
     *
     * Param1: boolean=> if 'true', indicates that the limit of '99' has been surpassed
     *           This instructs the FastMatch pill to just set its text as '99', no
     *           matter what the count is.
     */
    Java.use ("com.tinder.domain.fastmatch.model.FastMatchCount")
        .$init.overload ("int", "boolean")
        .implementation = function (p0, p1) {
/*
            if (p1) {
                console.log ("Real number of likes: 99+ (API limitations... T_T)");
            } else {
                console.log ("Real number of likes: " + p0);
            }
*/
            return this.$init (likesyou_mod, false);
        };

    /**
     * Fastmatch pill.
     */
    Java.use ("com.tinder.goldhome.GoldHomeTabNavBadgeLifecycleObserver")
        .i.overload ("int", "int")
        .implementation = function (p0, p1) {
            /* Apparently:
             *      p0 => previous value
             *      p1 => new value to set. If >99, the text later just says "99+"
             */

            var textView_d = this.d ();
            textView_d.setText (
                str_cls.$new ( likesyou_mod.toString () )
            );
        };


//    /**
//     * Matches screen.
//     */
//    Java.use ("com.tinder.fastmatch.view.FastMatchPreviewView")
//        .showCountPosition.overload ("com.tinder.fastmatch.viewmodel.FastMatchPreviewViewModel")
//        .implementation = function (p0) {
//
//            var textView_Count = this.getNonSubscriberLikesCount ();
//            textView_Count.setText (
//                str_cls.$new (likesyou_mod.toString ())
//            );
//        };


    /**
     *  This appears to work only on the "matches" screen...
     *  The above (commented out) method also works, but I find this one more
     *  entertaining to RE.
     */
    var cls_MatchStatus = Java.use ("com.tinder.domain.fastmatch.model.FastMatchStatus");
    var cls_Subscription = Java.use ("com.tinder.domain.common.model.Subscription");
    var enum_SubscriptionStatus = Java.use ("com.tinder.domain.common.model.Subscription$Status");

    Java.use ("com.tinder.fastmatch.presenter.FastMatchPreviewViewModelFactory")
        .create.overload ("com.tinder.domain.fastmatch.model.FastMatchStatus"
                , "com.tinder.domain.common.model.Subscription")
        .implementation = function (p0, p1) {

            var status = cls_MatchStatus.$new (
                likesyou_mod /* count */
                , false /* isRange */
                , p0.getPreviewUrl () /* previewUrl */
                , p0.getSource () /* source */
                , true /* preBlur */
            );

            /* Setting "isGold" to "true" we ensure that we can display any number, and
             * not up to "99+" */
            var subscription = cls_Subscription.$new (
                "98690128-a0aa-46b1-9d5c-6f6465519fd7" /* productId */
                , true /* isPlatinum */
                , true /* isGold */
                , true /* isSubscriber */
                , 2 /* terms */
                , p1.getPlatform () /* platform */
                , enum_SubscriptionStatus.SUCCESS.value /* status */
                , "5d2234ee-d779-4318-9064-5abc50df1ea8" /* purchaseId */
                , "ad6c5cbe-f3c5-4f2a-b771-e6737ff0dbe1" /* restoreToken */
                , 165986994800 /* expireDate */
                , false /* isAutoRenewing */
            );

            return this.create (status, subscription);
        };






    /* ======== DEPRECATED METHODS: ============ */

//    var tmp_cls = Java.use ("com.tinder.goldhome.GoldHomeTabNavBadgeLifecycleObserver");
//    tmp_cls.i.overload ("int", "int").implementation = function (a, b) {
//
//        console.log ("a = " + a + "  ;  b = " + b);
//    }

    /* Change number of likes on the golden pill at the top */
/*    Java.use ("com.tinder.goldhome.mapper.GoldHomeTextCountMapper")
        .map.overload ("int").implementation = function (count) {

        return str_cls.$new ("+9000");
    };
*/
    /* Change number of likes on the "likes you" (fastMatch?) view */
/*    var c_GoldHomeFragmentState = Java.use ("com.tinder.goldhome.datamodels.GoldHomeFragmentState");
    c_GoldHomeFragmentState.getLikesYouCount.overload ().implementation = function () {

        var retVal = this.getLikesYouCount ();
        console.log ("Real 'likes you' count: " + retVal);
        return 999;
    }
*/


    /* Only changes the text in "fastMatch" */
/*    Java.use ("com.tinder.goldhome.GoldHomeFragment")
        .q.overload ("boolean", "int").implementation = function (p0, p1) {

        // We can only tell our real number of likes up to 99
//        printBacktrace ();
        this.q (false, 99999);
    }
*/

/*
    textView_cls.setText.overload ("java.lang.CharSequence").implementation = function (s) {

        if (s && s ==  "99+") {
            console.log (s);
            this.setText (str_cls.$new ("asdf"));
            printBacktrace ();
            return;
        }

        this.setText (s);
    }
*/

});
