const formatPrice = price => {
    let result = '-- ₫';
    if (typeof price === 'number') {
        result = price.toLocaleString() + ' ₫';
    }
    return result;
};

export default formatPrice;
