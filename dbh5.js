/*
 ################################################################################
 #
 #   dbh5 is an LocalStorage class for HTML5, Sept 7, 2016
 #
 #   Copyright 2016 Karl Holz, <salamcast|(a)|gmail|d|com>
 #
 #   https://github.com/salamcast
 #
 #   Licensed under the Apache License, Version 2.0 (the "License");
 #   you may not use this file except in compliance with the License.
 #   You may obtain a copy of the License at
 #
 #       http://www.apache.org/licenses/LICENSE-2.0
 #
 #   Unless required by applicable law or agreed to in writing, software
 #   distributed under the License is distributed on an "AS IS" BASIS,
 #   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 #   See the License for the specific language governing permissions and
 #   limitations under the License.
 #
 ################################################################################
 */


var dbh5 = {
    getPage: function(p) {
        if (dbh5.db.getItem(p) !== null) {
            return JSON.parse(dbh5.db.getItem(p));
        }
        return [];
    },
    setPage: function(p, data) {
        if (typeof data === 'string') {
            var d = [];
            d.push(data);
            dbh5.db.setItem(p, JSON.stringify(d));
        } else if (typeof data === "undefined"){
            var d = [];
            dbh5.db.setItem(p, JSON.stringify(d));
        } else {
            dbh5.db.setItem(p, JSON.stringify(data));
        }

        return true;
    },
    deletePage: function(p) {
        dbh5.setPage(p, '');
        dbh5.db.removeItem(p);
        return true;
    },
    addItem: function(p, data) {
        var page = dbh5.getPage(p);
        page.push(data);
        return dbh5.setPage(p, page);
    },
    deleteItem: function(p, data) {
        var page = dbh5.getPage(p);
        var newpage = [];
        angular.forEach(page, function(d) {
            if (d != data) {
                newpage.push(d);
            }
        });
        return dbh5.setPage(p, newpage);
    },
    updateItem: function(p, old, data) {
        var page = dbh5.getPage(p);
        var newpage = [];
        angular.forEach(page, function(d) {
            if (d !== old) {
                newpage.push(d);
            } else {
                newpage.push(data);
            }
        });
        return dbh5.setPage(p, newpage);
    },
    getPages: function(){
        var p = [];
        for (x in dbh5.db) {
            p.push(x);
        }
        return p;
    },
    db: localStorage
};

