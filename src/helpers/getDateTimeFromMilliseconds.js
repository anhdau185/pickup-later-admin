const getDateTimeFromMilliseconds = ms => {
    const date = new Date(ms);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default getDateTimeFromMilliseconds;
