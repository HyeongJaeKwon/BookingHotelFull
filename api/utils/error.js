export const createError = (status, mess) => {
    const err = new Error();
    err.status = status;
    err.message = mess;
    return err; 
}