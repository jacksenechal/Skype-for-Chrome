/*
 * Copyright (c) 2011 Jack Senechal. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

// load options
chrome.extension.sendRequest({action: 'options'}, function(response) {
  // the localStorage mechanism converts the regex to a string, so we have to convert it back
  var stripper = /^\/|\/$/g;
  var intlRegex = RegExp(response.options.intlRegex.replace(stripper, ''), 'gm');
  var homeRegex = RegExp(response.options.homeRegex.replace(stripper, ''), 'gm');

  var linkType = response.options.linkType;
  var intlReplacement = '<a href="'+linkType+response.options.intlReplacement+'">$&</a>';
  var homeReplacement = '<a href="'+linkType+response.options.homeReplacement+'">$&</a>';

  var found = false;

  // Test the text of the body element against our international regular expression.
  if (intlRegex.test(document.body.innerText)) {
    $(document).find(':not(textarea)').replaceText( intlRegex, intlReplacement );
    found = true;
  }
  // Test the text of the body element against our home regular expression.
  if (homeRegex.test(document.body.innerText)) {
    $(document).find(':not(textarea)').replaceText( homeRegex, homeReplacement );
    found = true;
  }
  if (found) {
    // Notify the background page to update the page icon
    chrome.extension.sendRequest({action: 'showPageAction'}, function() {});
  }
});

