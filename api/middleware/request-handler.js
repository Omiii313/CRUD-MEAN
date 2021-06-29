const handleResponse = ({ res, statusCode = 200, msg = 'Success', data = {}, result = 1 }) => {
    res.status(statusCode).send({ result, msg, data });
};

const handleError = ({ res, statusCode = 500, err = 'error', result = 0, data = {}, }) => {
    res.status(statusCode).send({
        result,
        msg: err instanceof Error ? err.message : (err.msg || err),
        data,
    });
};

module.exports = {
    handleError: handleError,
    handleResponse: handleResponse
};