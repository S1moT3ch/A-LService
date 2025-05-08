module.exports = () => {
    return (req,res,next) => {
        if(!req.isAuthenticated()) return res.redirect('/login');
        next();
    }

    res.status(401).json({ message: 'Non autorizzato. Effettua il login.' });
}