const db = require('../core/db');
const httpMsgs = require('../core/httpMsgs');

exports.getList = function (req, res) {
    db.executeSql(`SELECT * FROM emp`, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            httpMsgs.sendJson(req, res, data.recordset);
        }
    });
};

exports.get = function (req, res, empno) {
    db.executeSql(`SELECT * FROM emp WHERE COD_BLOX = ${empno}`, function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        } else {
            httpMsgs.sendJson(req, res, data.recordset);
        }
    });
};

exports.add = function (req, res, reqBody) {
    try {
        if (!reqBody) throw new Error(`Input not valid!`);
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = `INSERT INTO emp (COD_LYCEUM, NOME, SITUACAO) VALUES `;
            sql += `('${data.COD_LYCEUM}', '${data.NOME}', '${data.SITUACAO}')`;
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                } else {
                    httpMsgs.send200(req, res);
                }
            });
        } else {
            throw new Error(`Input not valid!`);
        }
    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};

exports.update = function (req, res, reqBody) {
    try {
        if (!reqBody) throw new Error(`Input not valid!`);
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.COD_BLOX) throw new Error(`COD_BLOX not provided`);
            var sql = `UPDATE emp SET `;
            var isDataProvided = false;
            if (data.COD_LYCEUM) {
                sql += ` COD_LYCEUM = '${data.COD_LYCEUM}', `;
                isDataProvided = true;
            }
            if (data.NOME) {
                sql += ` NOME = '${data.NOME}',`;
                isDataProvided = true;
            }
            if (data.SITUACAO) {
                sql += ` SITUACAO = '${data.SITUACAO}',`;
                isDataProvided = true;
            }
            sql = sql.slice(0, -1); //remove last comma
            sql += ` WHERE COD_BLOX = ${data.COD_BLOX}`;
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                } else {
                    httpMsgs.send200(req, res);
                }
            });
        } else {
            throw new Error(`Input not valid!`);
        }
    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};

exports.delete = function (req, res, reqBody) {
    try {
        if (!reqBody) throw new Error(`Input not valid!`);
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.COD_BLOX) throw new Error(`COD_BLOX not provided`);
            var sql = `DELETE FROM emp `;
            sql += ` WHERE COD_BLOX = ${data.COD_BLOX}`;
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                } else {
                    httpMsgs.send200(req, res);
                }
            });
        } else {
            throw new Error(`Input not valid!`);
        }
    } catch (ex) {
        httpMsgs.show500(req, res, ex);
    }
};