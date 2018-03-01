var query = undefined;
const path = require('path')
const tools = require(path.join(__dirname, '..','..','db-tools.js'));

module.exports = {
    setQueryManager: function(query) {
        this.query = query;
    },
    db: function(callback) {

        const query = {
            text: tools.readQueryFile(path.join(__dirname, 'CREATE_CONDUIT_DB.sql')),
        }
        this.query(query, function(err) {
            if(err) {
                return console.error('error creating db', err);
            }
            callback();
        });
    },
    tables: function() {
        return new Promise(function(resolve, reject) {
            const query = {
                text: tools.readQueryFile(path.join(__dirname, 'conduit_db.schema.backup.sql')),
            }
            this.query(query, function(err, res) {
                if(err) {
                    return reject(err);
                }
                else
                    return resolve(res);
            });
        });
    },
    conduitDb: function() {

        var files = [
            'CREATE_CONDUIT_DB.sql',

            'CREATE_SEQ_ATTRIBUTES.sql',
            'CREATE_SEQ_BOOKS.sql',
            'CREATE_SEQ_IMAGES.sql',
            'CREATE_SEQ_TAGS.sql',
            'CREATE_SEQ_TEAMS.sql',
            'CREATE_SEQ_USERS.sql',

            'CREATE_TBL_ARTICLES.sql',
            'CREATE_TBL_TEAMS.sql',
            'CREATE_TBL_USERS.sql',
            'CREATE_TBL_TAGS.sql',
            'CREATE_TBL_IMAGES.sql',
            'CREATE_TBL_IMAGES_STATUS.sql',
            'CREATE_TBL_ARTICLES_EDITS.sql',
            'CREATE_TBL_ARTICLES_STATUS.sql',
            'CREATE_TBL_COMMENTS.sql',
            'CREATE_TBL_BOOKS.sql',
            'CREATE_TBL_BOOKS_STATUS.sql',
            'CREATE_TBL_SESSIONS.sql',
            'CREATE_TBL_ATTRIBUTES.sql',

            'CREATE_DATA_ATTRIBUTES.sql'
        ]

        console.log(files);

        (function next(query) {
            //var statement = statements.shift();
            const statement = {
                text: tools.readQueryFile(path.join(__dirname, files.shift())),
            }
            console.log(statement.text);
            if (statement) {
              query(statement, function(err, response) {
                if (err) {
                    console.log('ERR');
                    console.log(err);
                    console.log('-------------');
                    return;
                }
                console.log('SUCCESS');
                console.log(response);
                console.log('-------------');
                next(query);
              });
            }
            else
              console.log('no statement');
              return;
          })(this.query);
    }
};