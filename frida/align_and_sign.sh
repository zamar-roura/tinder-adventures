#!/bin/sh

if [ $# -ne 1 ]
then
	printf "Usage: %s <file.apk>\n" "$0"
	exit
fi

if [ ! -d "$1" ]
then
	printf "Error: directory %s doesn't exist\n" "$1"
fi

DIR="${1%/}"

apktool-git b "$DIR" -o "${DIR}_patched.apk" \
&& zipalign -fp 4 "${DIR}_patched.apk" "${DIR}_patched_aligned.apk" \
&& apksigner sign --ks "$(dirname "$0")/123456.jks" --ks-pass pass:123456 "${DIR}_patched_aligned.apk" \
&& mv -v "${DIR}_patched_aligned.apk" "${DIR}_SIGNED.apk" \
&& rm -fv "${DIR}_patched.apk"
