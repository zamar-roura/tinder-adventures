// Java.perform(function() {
//     Java.use("com.tinder.ui.views.FastMatchPillView").$init.overload("android.content.Context","android.util.AttributeSet").implementation = function(c,v) {
//         console.log("HEHEHEHY")
//         return this.$init(c,v);
//     }
//     })
// Java.perform(function() {
    
//     var userRecExtKt = Java.use("com.tinder.recs.domain.model.UserRecExtKt");
//     userRecExtKt.firstTeaserType.overload('com.tinder.recs.domain.model.UserRec')
//             .implementation = function (a) {
//             console.log(a);
//     };
//     userRecExtKt.firstTeaserType(p)
// });
Java.perform(function() {

    var ratingProcessor = Java.use("com.tinder.domain.recs.engine.dispatcher.RatingProcessor")
    ratingProcessor.rate.implementation = function(rate){
        return this.rate(rate)
    }
    ratingProcessor.markSwipeAsRated.implementation = function(swipe,result){
        console.log(swipe);
        console.log(result);
        return this.markSwipeAsRated(swipe,result)
    }
    var fastMatchRecsGridPresenter = Java.use('com.tinder.fastmatch.presenter.FastMatchRecsGridPresenter');
    fastMatchRecsGridPresenter.$init.implementation = 
    function(cardFactory,recsEngine,decFastMatchCount,fetchFastMatchCount,fastMatchPreviewStatusProvider,
        ratingProcessor,fastMatchSessionManager,fastMatchConfigProvider,markFastMatchTutorialAsSeen,
        addLikesYouConnectionFailEvent,userRecMediaAlbumProvider,refreshNotifier,observeNewMatches,
        addNewLikesYouPillResetEvent,fastMatchNewCountAbTestResolver,fastMatchRecsResponseRepository,
        scrollStatusNotifier,scrollStatusProvider,recPrefetcher,loadProfileOptionData,superlikev2ActionProvider,
        superLikeV2ExperimentUtility,observeFastMatchHeaderState,getFastMatchEmptyViewState,currentScreenTracker,
        observeUserRecExperiments,markRecIdAsSwipedOn,resetGoldHomeNewLikesCount,saveGoldHomeLikesCount,navigationExperimentUtility,logger,schedulers){
            return this.$init(cardFactory,recsEngine,decFastMatchCount,fetchFastMatchCount,fastMatchPreviewStatusProvider,
                ratingProcessor,fastMatchSessionManager,fastMatchConfigProvider,markFastMatchTutorialAsSeen,
                addLikesYouConnectionFailEvent,userRecMediaAlbumProvider,refreshNotifier,observeNewMatches,
                addNewLikesYouPillResetEvent,fastMatchNewCountAbTestResolver,fastMatchRecsResponseRepository,
                scrollStatusNotifier,scrollStatusProvider,recPrefetcher,loadProfileOptionData,superlikev2ActionProvider,
                superLikeV2ExperimentUtility,observeFastMatchHeaderState,getFastMatchEmptyViewState,currentScreenTracker,
                observeUserRecExperiments,markRecIdAsSwipedOn,resetGoldHomeNewLikesCount,saveGoldHomeLikesCount,navigationExperimentUtility,logger,schedulers);
        }
    var userRecExperiments = Java.use('com.tinder.recs.ui.model.UserRecExperiments');
    var cardConfig = Java.use('com.tinder.recs.card.CardConfig');
    var cardFactory = Java.use('com.tinder.recs.RecsCardTypedFactory');
    cardFactory.createCard.overload('com.tinder.domain.recs.model.Rec', 'com.tinder.recs.card.CardConfig', 'int').implementation = function(a,b,c){
            var userRec = userRecExperiments.$new(true,true,true,true,-1,true,true,true,true,true,true,20,true,true)
            var card = cardConfig.$new(b.component1(),userRec)
            return this.createCard(a,card,c)
    }
    var userRecExtKt = Java.use("com.tinder.recs.domain.model.UserRecExtKt");
    userRecExtKt.firstTeaserType
            .implementation = function (a) {
            var f = this.firstTeaserType(a)
            return f
    };
    userRecExtKt.firstTeaserValue
            .implementation = function (a) {
            var f = this.firstTeaserType(a)
            return f
    };

    var cardPresenter = Java.use("com.tinder.fastmatch.presenter.FastMatchUserRecCardPresenter");
    // cardPresenter.a
    //         .implementation = function (a) {
    //             // var f = this.a(a)
    //             var b = Java.cast(this,cardPresenter)._b.value
    //             // var t = Java.cast(a,userRec)
    //             var kt1 = userRecExtKt.firstTeaserType.call(userRecExtKt,a)
    //             console.log(kt1)
    //             // var kt2 = userRecExtKt.firstTeaserValue(a) 
    //             var B = Java.use("java.lang.Boolean")
    //             var gob = B.$new(true)
    //             // console.log("A method card presenter")
    //             // console.log(Object.keys(a))
    //             // console.log("Name")
    //             // console.log(a.getName())
    //             // console.log("Hash")
    //             // console.log(a.getContentHash())
    //             b.invoke("",true,gob,"","")
    //             // return f
              
    // };
    
    cardPresenter.b
            .implementation = function (a) {
                var f = this.b(a)
                console.log("B method card presenter")
                console.log(a)
                console.log(a.getName())
                console.log(a.getUser())
            return f;
    };
    cardPresenter.$init
            .implementation = function (a,b) {
                var f = this.$init(a,b)
            return f;
    };
    var initShowPaywall = Java.use("com.tinder.mylikes.ui.card.LikedUserState$ShowPaywall");
    initShowPaywall.$init
            .implementation = function (a,b) {
                var f = this.$init(a,b)
                console.log(f)
            return f;
    };
    var showPaywall = Java.use("com.tinder.mylikes.ui.card.LikedUserState$ShowPaywall");
    showPaywall.toString
            .implementation = function () {
                var f = this.toString()
                console.log(f)
            return f;
    };
    var goldPaywall = Java.use("com.tinder.fastmatch.view.TinderGoldPaywallDialog");
    goldPaywall.$init
            .overload ("android.content.Context", "com.tinder.fastmatch.view.TinderGoldPaywallDialog$Options")
            .implementation = function (a,b) {
                console.log("PAYWALL")
                console.log(b)
                var f = this.$init(a,b)
            return f;
    };
    var blurMask = Java.use ("jp.wasabeef.glide.transformations.internal.FastBlur");
    blurMask.blur
            .overload ("android.graphics.Bitmap", "int", "boolean")
            .implementation = function (sent, radius, canReuse) {
            return sent;
    };
    
    var st = Java.use("com.tinder.ui.views.FastMatchPillView")
    st.setCount.implementation = function(i) {
        console.log("hehyehe");
        var ret = this.setCount(i);
        return ret;
    }
    Java.use("com.tinder.ui.views.FastMatchPillView").getCount.implementation = function() {
        console.log("HEHEHEHY");
        var ret =  this.getCount();
        return ret;
    }
    Java.use("com.tinder.ui.views.FastMatchPillView").getShadowPillCount.implementation = function() {
        console.log("HEHEHEHY");
        var ret =  this.getShadowPillCount();
        return ret;
    }
    Java.use("com.tinder.ui.views.FastMatchPillView").getLikeCountText.implementation = function() {
        console.log("HEHEHEHY");
        var ret = this.getLikeCountText();
        return ret;
    }
})
