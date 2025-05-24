exports.intro = (request, response) => {
    response.json({ 
        message: 'Ok',
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