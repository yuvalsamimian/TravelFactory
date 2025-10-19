const db=require("mysql");

const pool=db.createPool({
    host: "localhost",
    user: "root",
    database: "vacation_requests",
    timezone: "utc"
});

function executeQueryAsync(sqlCmd) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, (err, result)=> {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                // console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = {
    executeQueryAsync
};
