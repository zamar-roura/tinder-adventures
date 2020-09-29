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

----

# Configuration

The gadget can be configured with a file as described in [Frida's documentation](https://frida.re/docs/gadget/).

As this is an App Bundle with `extracNativeLibs=false`, the default Frida gadget is not able to read our config file. Therefore, we patched it to have a hard-coded config path (see `frida-core.patch`). In the future we may improve this patch to extract the config from the apk file, or something...

For the moment, the config file **needs to be** in the following path `/data/data/com.tinder/files/libgadget.config.json`, and it has to be readable by the Tinde app user (`u0_a123`, for example). Take a look at the rest of files in that directory to know which user and group is used by that app.

We cannot use `/sdcard` because that requires an additional permission, which has to be modified in the `AndroidManifest.xml`. With the current version of `apktool` we're not able to re-compile the resources, so that's not an option for now.
