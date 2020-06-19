const classNames = classObject => {
    const classes = [];

    if (typeof classObject === 'object') {
        for (const key in classObject) {
            if (classObject.hasOwnProperty(key) && classObject[key]) {
                classes.push(key);
            }
        }
    }

    return classes.join(' ');
};

export default classNames;
