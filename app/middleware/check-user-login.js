module.exports = () => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            // Per richieste API (ad esempio AJAX) restituisci JSON,
            // altrimenti fai il redirect alla pagina di login.
            if (req.accepts('html')) {
                return res.redirect('/login');
            } else {
                return res.status(401).json({ message: 'Non autorizzato. Effettua il login.' });
            }
        }
        next();
    };
};