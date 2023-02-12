module.exports = function (template, product) {
    let output = template
        .replaceAll('{%PRODUCT_NAME%}', product.productName)
        .replaceAll('{%IMAGE%}', product.image)
        .replaceAll('{%PRICE%}', product.price)
        .replaceAll('{%QUANTITY%}', product.quantity)
        .replaceAll('{%ID%}', product.id)
        .replaceAll('{%FROM%}', product.from)
        .replaceAll('{%NUTRIENTS%}', product.nutrients)
        .replaceAll('{%DESCRIPTION%}', product.description);
    if (!product.organic)
        return output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');
    else
        return output;
};

