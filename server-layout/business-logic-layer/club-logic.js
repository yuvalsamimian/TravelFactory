const dal = require("../data-access-layer/dal");

function getAllUsers(){
    return dal.executeQueryAsync(`
        SELECT * FROM users
        `)
}

function isUserExist(userId){
    return dal.executeQueryAsync(`
        SELECT * FROM users WHERE user_id = ${userId}
        `)
}

function getAllUserRequests(userId){
    return dal.executeQueryAsync(`
        SELECT * FROM requests WHERE user_id = ${userId}
        `)
}

function getAllRequests(){
    return dal.executeQueryAsync(`
        SELECT * FROM requests
        `)
}

function postVacationRequest(request) {
    return dal.executeQueryAsync(`
        INSERT INTO requests
        (user_id, start_date, end_date, reason, status, comments, validator_id)
        VALUES (
            ${request.user_id},
            '${request.start_date}',
            '${request.end_date}',
            '${request.reason}',
            'pending',
            NULL,
            NULL
        )
    `);
}

function approveOrReject(request){
        return dal.executeQueryAsync(`
        UPDATE requests
        SET 
            user_id = ${request.user_id},
            start_date = '${request.start_date}',
            end_date = '${request.end_date}',
            reason = '${request.reason}',
            status = '${request.status}',
            comments = '${request.comments}',
            validator_id = ${request.validator_id}
        WHERE request_id = ${request.request_id}
    `);
}


module.exports = {
  getAllUsers,  postVacationRequest, getAllUserRequests ,getAllRequests, approveOrReject, isUserExist
}