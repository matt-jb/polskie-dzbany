exports.catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

exports.flashValidationErrors = (err, req, res, next) => {
    if (!err.errors) return next(err); // No errors? gr8 m8, pls skip!
    
    // Validation errors? Display them! 
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach(key => req.flash('danger', err.errors[key].message));
    res.redirect('back');
  };