#!/bin/bash

textReset=$(tput sgr0)
textGreen=$(tput setaf 2)

message_info () {
  echo "${textGreen}[Init TAN cordova project]${textReset} $1"
}

message_info "Creating necessary directories..."
mkdir plugins
mkdir platforms

message_info "Adding platforms..."
cordova platform add ios

message_info "Adding plugins..."
cordova plugin add com.lesfrancschatons.cordova.plugins.pdfreader
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-dialogs
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-plugin-whitelist