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

FILE="$1"

apktool-git b "$1" -o "$1_patched.apk" \
&& zipalign -fp 4 "$1_patched.apk" "$1_patched_aligned.apk" \
&& apksigner sign --ks 123456.jks --ks-pass pass:123456 "$1_patched_aligned.apk" \
&& mv -v "$1_patched_aligned.apk" "$1_patched.apk"
