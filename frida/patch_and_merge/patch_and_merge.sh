#!/bin/sh

AUTHORS="Foo-Manroot"
LAST_MODIF_DATE="2021-02-06"
VERSION="v1.0"

HELP_MSG="$AUTHORS
$LAST_MODIF_DATE
$VERSION

Script to automate the decompilation, patch and rebuild of Tinder application, to inject
the provided Frida script.

Usage:
$0 <base-name> <frida-script>

Where:
	'base-name' is the common prefix for all the split apk files.
		For example, if we have:
			com.tinder.12000136.apk
			com.tinder.12000136.config.armeabi_v7a.apk
			com.tinder.12000136.config.en.apk
			com.tinder.12000136.config.xxhdpi.apk

		'base-name' WILL BE => \"com.tinder.12000136\"

	'frida-script' is the JS file to add to the app's lib directory.
"

############
## CONFIG ##
############

# URL from which to pull the Frida gadget. If you want to pull it locally, just set up a
# server on localhost and change this param accordingly. I'm too lazy to do it properly.
GADGET_URL="https://github.com/frida/frida/releases/download/14.2.11/frida-gadget-14.2.11-android-arm.so.xz"

GADGET_CONFIG="
{
	\"interaction\": {
		\"type\": \"script\",
		\"path\": \"/data/data/com.tinder/lib/libgadget.js.so\"
	}
}
"

# Location of the generated APK
OUT_APK="$(pwd)/merged_and_patched.apk"

# One could say that it's easier to receive it as a parameter... XD
KEYSTORE_B64="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"

#####################################################
#####################################################
#####################################################

# Checks that all the needed tools are present
errors=0
for req in \
		apktool \
		zipalign \
		apksigner \
		curl \
		unxz
do
	if ! command -v "$req" >/dev/null
	then
		printf "Requirement not found: '%s'\n" "$req"
		printf "Please, install it or add it to your \$PATH\n"

		errors=$((errors + 1))
	fi
done


if [ $errors -ne 0 ]
then
	exit $errors
fi

# ---------------------------------------------------------------------------------------

# Checks arguments (only 2 positional args allowed, and required)
if [ $# -ne 2 ]
then
	printf "%s\n" "$HELP_MSG"
	exit 1
fi

if [ "$1" = "-h" ] || [ "$1" = "--help" ] \
	|| [ "$2" = "-h" ] || [ "$2" = "--help" ]
then
	printf "%s\n" "$HELP_MSG"
	exit 0
fi

# Check the required files exist
BASE_NAME="$1"

if ! [ -r  "$BASE_NAME.apk" ] \
	|| ! [ -r  "$BASE_NAME.config.armeabi_v7a.apk" ] \
	|| ! [ -r  "$BASE_NAME.config.en.apk" ] \
	|| ! [ -r  "$BASE_NAME.config.xxhdpi.apk" ]
then
	printf "Error: any of these files is missing or read permission was not granted:\n"
	printf "\t%s.apk\n" "$BASE_NAME"
	printf "\t%s.config.armeabi_v7a.apk\n" "$BASE_NAME"
	printf "\t%s.config.en.apk\n" "$BASE_NAME"
	printf "\t%s.config.xxhdpi.apk\n" "$BASE_NAME"
	exit 2
fi

# We need the full path for later
SCRIPT_FILE="$(readlink -f "$2")"

if ! [ -r "$SCRIPT_FILE" ]
then
	printf "Error: the JS file '%s' was not found or is not readable.\n" "$SCRIPT_FILE"
	exit 3
fi

# ---------------------------------------------------------------------------------------

# This is the actual start of the script itself

LOGNAME="$(basename "$0")"
TEMP_DIR="$(mktemp -d)"
printf "Using '%s' as temp dir\n" "$TEMP_DIR"

printf "\n[%s] ############## DECOMPILING ALL COMPONENTS ################\n\n" "$LOGNAME"

apktool d "$BASE_NAME.apk" -o "$TEMP_DIR/merged"
apktool d "$BASE_NAME.config.armeabi_v7a.apk" -o "$TEMP_DIR/armeabi_v7a"
apktool d "$BASE_NAME.config.en.apk" -o "$TEMP_DIR/en"
apktool d "$BASE_NAME.config.xxhdpi.apk" -o "$TEMP_DIR/xxhdpi"

printf "\n[%s] ############## DECOMPILATION FINISHED ################\n\n" "$LOGNAME"

# We have to copy files without overwriting them, keeping a record of what was copied to
# add it later to apktool.yml
cd "$TEMP_DIR" || exit
(
	cd merged/ || exit
	mkdir lib/
	{
		cp -rnv ../armeabi_v7a/lib/ .
		cp -rnv ../en/res/ .
		cp -rnv ../xxhdpi/res/ .
	} > ../file_list
)

# Entries have this format:
# '../armeabi-v7a/lib/armeabi-v7a/libtinteg.so' -> './lib/armeabi-v7a/libtinteg.so'
# and have to be converted to this:
# - lib/armeabi-v7a/libtinteg.so
sed -i -E "s#^.+-> './#- #g" file_list
sed -i -E "s#'\$##g" file_list

printf "\n[%s] ############## INJECTING FRIDA ##############\n\n" "$LOGNAME"
# We also have to add our injected files
curl -#L "$GADGET_URL" -o merged/lib/armeabi-v7a/libgadget.so.xz
unxz merged/lib/armeabi-v7a/libgadget.so.xz

printf "\n[%s] This is the configuration file to be added:\n" "$LOGNAME"
printf "%s" "$GADGET_CONFIG" | tee merged/lib/armeabi-v7a/libgadget.config.so
cp -v "$SCRIPT_FILE" merged/lib/armeabi-v7a/libgadget.js.so

{
	printf -- "- lib/armeabi-v7a/libgadget.so\n"
	printf -- "- lib/armeabi-v7a/libgadget.config.so\n"
	printf -- "- lib/armeabi-v7a/libgadget.js.so\n"
} >> file_list

# Add it to apktool.yml
# I probably should use a YAML wrapper, but this does the trick...
lineno="$(grep -n "^doNotCompress:" merged/apktool.yml | cut -d: -f1)"
head -n "$lineno" merged/apktool.yml > merged_yaml
cat file_list >> merged_yaml
awk "NR > $lineno { print \$0; }" merged/apktool.yml >> merged_yaml

mv merged_yaml merged/apktool.yml

# Again, to modify the manifest, I should probably use a proper XML parser or something...
sed -i -E 's/android:isSplitRequired="true"/android:isSplitRequired="false"/g' merged/AndroidManifest.xml

# Patch LoginActivity.smali to inject our gadget on startup
file_to_patch="$(find . -type f -name "LoginActivity.smali")"

# Patch created with: `diff -C 5 <original> <modified>`
SMALI_PATCH="
*** $file_to_patch
--- mod/LoginActivity.smali
***************
*** 224,234 ****
  .end field


  # direct methods
  .method static constructor <clinit>()V
!     .locals 2

      new-instance v0, Lcom/tinder/activities/LoginActivity\$Companion;

      const/4 v1, 0x0

--- 224,237 ----
  .end field


  # direct methods
  .method static constructor <clinit>()V
!     .locals 3
!
! 	const-string v2, \"gadget\"
! 	invoke-static {v2}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V

      new-instance v0, Lcom/tinder/activities/LoginActivity\$Companion;

      const/4 v1, 0x0
"
printf "%s\n" "$SMALI_PATCH" | patch -p0 -c --fuzz=4 --ignore-whitespace

# Finally: rebuild, align and sign our new apk
printf "%s\n" "$KEYSTORE_B64" | base64 -d > store.jks

apktool b merged/ -o merged.apk -f --use-aapt2 \
	&& zipalign -fp 4 merged.apk merged_aligned.apk \
	&& apksigner sign --ks store.jks --ks-pass pass:123456 merged_aligned.apk \
	&& mv merged_aligned.apk "$OUT_APK" -v

#rm -rf "$TEMP_DIR"

printf "\n[%s] ############## ALL DONE ##############\n" "$LOGNAME"
printf "[%s] You can find here your apk ready to be installed: %s\n" "$LOGNAME" "$OUT_APK"
