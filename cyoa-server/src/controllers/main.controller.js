exports.intro = (request, response) => {
    response.json({ 
        message: 'Welcome to the CYOA API',
        status: 'active'
    });
};

exports.next = (request, response) => {
    response.json({
        message: 'Next story segment',
        currentPage: 1,
        choices: [
            { id: 1, text: 'Go left' },
            { id: 2, text: 'Go right' }
        ]
    });
};