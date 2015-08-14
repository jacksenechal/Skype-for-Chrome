/*
 * Copyright (c) 2011 Jack Senechal. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

function initialize() {
  loadOptions();
  document.getElementById('save-button').addEventListener('click',
      saveOptions);
  document.getElementById('reset-button').addEventListener('click',
      clearData);
}

document.addEventListener('DOMContentLoaded', initialize);