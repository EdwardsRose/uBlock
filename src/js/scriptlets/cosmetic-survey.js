/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2015-2017 Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

'use strict';

/******************************************************************************/

(function() {
    if ( typeof vAPI !== 'object' || !vAPI.domFilterer ) { return; }

    var resultset = new Set(),
        nodes, i;

    for ( var sheet of vAPI.domFilterer.getStylesheets() ) {
        nodes = document.querySelectorAll(sheet.replace(/^\{[^\n]+\}\n?/gm, ''));
        i = nodes.length;
        while ( i-- ) {
            resultset.add(nodes[i]);
        }
    }

    vAPI.messaging.send(
        'scriptlets',
        {
            what: 'cosmeticallyFilteredElementCount',
            pageURL: window.location.href,
            filteredElementCount: resultset.size
        }
    );
})();
