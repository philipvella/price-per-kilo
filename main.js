
    let cleanNumber = (num) => (Number(num.replace(/[^0-9.-]+/g, "")));

    let products = document.querySelectorAll('.product-details-container');
    products.forEach(el => {
        //weights
        let weights = (el.getElementsByClassName('product-title')[0].innerHTML)
        const grams_regex = /\d{1,}.(g|gr|gram|grams|\sg|\sgr|\sgram|\sgrams)$/gmi;
        const kilograms_regex = /\d{0,},{0,}\d{0,}\.{0,}\d{1,}.(kg|kilo|kilos|ks|kilograms|kilo\sgrams|\skg|\skilo|\skilos|\sks|\skilograms|\skilo\sgrams)$/gmi;


        // grams
        while ((m = grams_regex.exec(weights)) !== null) {
            if (m.index === grams_regex.lastIndex) {
                grams_regex.lastIndex++;
            }
            let weight_grams_dirty = m[0]
            let weight_grams = cleanNumber(weight_grams_dirty)
            el.setAttribute('data-grams',(weight_grams));
        }

        // kilograms
        while ((m = kilograms_regex.exec(weights)) !== null) {
            if (m.index === kilograms_regex.lastIndex) {
                kilograms_regex.lastIndex++;
            }
            let weight_kilograms_dirty = m[0]
            let weight_kilograms = cleanNumber(weight_kilograms_dirty)
            el.setAttribute('data-kilograms',(weight_kilograms));   
        }

        // price
        let price_dirty = (el.getElementsByClassName('current')[0].innerHTML)
        let price = cleanNumber(price_dirty)
        el.setAttribute('data-price',price);


        // pricee per kilo
        let kgs = el.getAttribute('data-kilograms')
        let g = el.getAttribute('data-grams')
        let price_per_kilo = Math.round(price / (kgs ? kgs : (g / 1000)) * 100) / 100
        el.setAttribute('data-price-perkilo',price_per_kilo)

        // adding to dom
        let div_ppk = document.createElement('h1');
        div_ppk.style.backgroundColor="#dae8c3";

        div_ppk.innerHTML = "€" + price_per_kilo + "  / kg";
        el.parentNode.insertBefore( div_ppk, el );
        Math.round(div_ppk * 100) / 100


    })
