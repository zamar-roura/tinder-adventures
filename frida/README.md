In `base.apk`, there's only one modification to load `libgadget.so`:

```sh
$ diff -u ./base/smali_classes4/com/tinder/activities/LoginActivity.smali /tmp/LoginActivity_MOD.smali
--- ./base/smali_classes4/com/tinder/activities/LoginActivity.smali	2020-09-22 23:10:49.595539846 +0200
+++ /tmp/LoginActivity_MOD.smali	2020-09-22 23:10:38.231417116 +0200
@@ -234,7 +234,10 @@

 # direct methods
 .method static constructor <clinit>()V
-    .locals 2
+    .locals 3
+
+    const-string v2, "gadget"
+    invoke-static {v2}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V

     new-instance v0, Lcom/tinder/activities/LoginActivity$Companion;
```


In `split_config.armeabi_v7a` there's a new library with the gadget to inject Frida, `libgadget.so`, and its configuration.
The documentation for the config file is here: https://frida.re/docs/gadget/

----

Once installed, the gadget sets up a server to which we can connect as usual from our computer:

```sh
$ frida -U Gadget -l index.js
```
