function dbInit() {   //initialize the database
    let db = LocalStorage.openDatabaseSync("TODO DATABASE", "", "Track Tasks", 1000000)
    try {
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS task_log (date text,discibtion text,completion text)')
            })
        } catch (err) {
            console.log("Error creating table in database: " + err)
        }
    };

function dbGetHandle(){ //get the database i guess
    try {
           var db = LocalStorage.openDatabaseSync("TODO DATABASE", "", "Track Tasks", 1000000)
       } catch (err) {
           console.log("Error opening database: " + err)
       }
       return db
}

function dbInsert(){ //insert into the database i think
    let db = dbGetHandle()
       let rowid = 0;
       db.transaction(function (tx) {
           tx.executeSql('INSERT INTO task_log VALUES(?, ?, ?)',
                         [Pdate, Pdis, Pcompletion])
           let result = tx.executeSql('SELECT last_insert_rowid()')
           rowid = result.insertId
       })
       return rowid;
}

function dbReadAll() //idk reads from database??
{
    let db = dbGetHandle()
        db.transaction(function (tx) {
            let results = tx.executeSql(
                    'SELECT rowid,date,discribtion,completion FROM trip_log order by rowid desc')
            for (let i = 0; i < results.rows.length; i++) {
                listModel.append({
                                     id: results.rows.item(i).rowid,
                                     checked: " ",
                                     date: results.rows.item(i).date,
                                     trip_desc: results.rows.item(i).trip_desc,
                                     distance: results.rows.item(i).distance
                                 })
            }
        })
}

function dbUpdate(Pdate, Pdis,Pcompletion,Prowid)
{
    let db = dbGetHandle()
        db.transaction(function (tx) {
            tx.executeSql(
                        'update task_log set date=?, discribtion=?, completion=? where rowid = ?', [Pdate, Pdis, Pcompletion, Prowid])
        })
}

function dbDeleteRow(Prowid){
    let db = dbGetHandle()
        db.transaction(function (tx) {
            tx.executeSql('delete from task_log where rowid = ?', [Prowid])
        })
}

//i guess i created a java file that calls the database
