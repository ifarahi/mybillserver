function initialResponseSchema() {
    return {
        data: {
            message: "",
            data: {} // can be {} or []
        },
        error: {
            message: "", // general message error
            general: [],
            fields: {}
        }
    };
}

module.exports = { initialResponseSchema };