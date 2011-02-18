/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /\b\(?(\d{3})\)?[. -](\d{3})[. -](\d{4})\b/;
var replacement = '<a href="callto:+1$1$2$3">$&</a>';

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
  //console.log("replacing text...");
  $(document).find(':not(textarea)').replaceText( regex, replacement );
  //console.log("done. what's next, boss?");
  // The regular expression produced a match, so notify the background page.
  chrome.extension.sendRequest({}, function(response) {});
} else {
  // No match was found.
}
