/*
 * Copyright (c) 2011 Jack Senechal. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

var defaults = {
  intlRegex: /(\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7)[0-9. -]{4,14})(?:\b|x\d+)/,
  intlReplacement: '$1',
  homeRegex: /(?:\b|(?:((?:\b|\+)1)[. -]?)|\()(\d{3})\)?[. -]?(\d{3})[. -]?(\d{4})(?:\b|x\d+)/,
  homeReplacement: '$1$2$3$4',
  linkType: 'skype:'
}

function loadOptions() {
  // set up link type
  var linkType = localStorage['linkType'] || defaults['linkType'];
  var linkTypeSelect = document.getElementById('linkType');
  for (var i = 0; i < linkTypeSelect.children.length; i++) {
    var child = linkTypeSelect.children[i];
    if (child.value == linkType) {
      child.selected = 'true';
      break;
    }
  }
  // set up international number regex
  var intlRegex = localStorage['intlRegex'] || defaults['intlRegex'];
  document.getElementById('intlRegex').value = intlRegex.toString();
  // set up home number regex
  var homeRegex = localStorage['homeRegex'] || defaults['homeRegex'];
  document.getElementById('homeRegex').value = homeRegex.toString();

  // set up international number replacement
  var intlReplacement = localStorage['intlReplacement'] || defaults['intlReplacement'];
  document.getElementById('intlReplacement').value = intlReplacement.toString();
  // set up home number replacement
  var homeReplacement = localStorage['homeReplacement'] || defaults['homeReplacement'];
  document.getElementById('homeReplacement').value = homeReplacement.toString();
}

function saveOptions() {
  try {
    localStorage['linkType'] = document.getElementById('linkType').value;
    localStorage['intlRegex'] = RegExp(document.getElementById('intlRegex').value.replace(/^\/|\/$/g, ""));
    localStorage['homeRegex'] = RegExp(document.getElementById('homeRegex').value.replace(/^\/|\/$/g, ""));
    localStorage['intlReplacement'] = document.getElementById('intlReplacement').value;
    localStorage['homeReplacement'] = document.getElementById('homeReplacement').value;
    setStatus('Options Saved.');
  } catch (error) {
    alert(error);
  }
}

function setStatus(message) {
  var status = document.getElementById('status');
  status.innerHTML = message;
  setTimeout(function() {
    status.innerHTML = '';
  }, 4000);
}

function clearData() {
  if (confirm('Clear data in extension? (includes extension settings)')) {
    localStorage.clear();
    alert('Extension data cleared.');
  }
}

