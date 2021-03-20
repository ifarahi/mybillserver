function formatErrorJoi(errors) {
    const formattedObj = {};
  
    errors.details.forEach((err) => {
      formattedObj[err.context.key] = {
        code: 'invalid data',
        message: err.message
      };
    });
  
    return formattedObj;
}

module.exports = { formatErrorJoi };