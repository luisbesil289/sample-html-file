const products = [
    {
        name: "Tomato",
        price: 19,
        quantity: 2
    },
    {
        name: "Potato",
        price: 16,
        quantity: 4
    },
    {
        name: "Milk",
        price: 32,
        quantity: 2
    }
];

const TAXES = 0.24;

const createDeleteButton = () => {
    /*
    The following code generate this HTML and returns the created button element:
        <button type="button" class="btn btn-outline-danger">
            <i class="material-icons">
                delete
            </i>
        </button>
    */
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn');
    button.classList.add('btn-outline-danger');

    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.textContent = 'delete';
    button.appendChild(icon);

    return button;
}

const createCellWithText = (text) => {
    var cell = document.createElement("td");
    var cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    return cell;
}

const deleteProduct = (productName) => {
    const productIndex = products.findIndex(product => product.name === productName);
    products.splice(productIndex, 1);
}

const drawTable = () => {
    // Gets products-list tbody element reference and store it on a variable.
    const tableBody = document.querySelector('#products-list tbody');

    products.forEach(product => {
        var row = document.createElement("tr");

        const nameCell = createCellWithText(product.name);
        row.appendChild(nameCell);

        const priceCell = createCellWithText(product.price);
        priceCell.classList.add('price');
        row.appendChild(priceCell);

        const quantityCell = document.createElement("td");
        const quantityInput = document.createElement('input');
        quantityInput.value = product.quantity;
        quantityInput.type = 'number';
        quantityInput.classList.add('form-control')
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);

        const subtotalCell = createCellWithText(product.price * product.quantity);
        row.appendChild(subtotalCell);

        const actionsCell = document.createElement("td");
        const deleteButton = createDeleteButton();
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

const calculateSubTotal = () => {
    return products.reduce((accumulator, product) => {
        return accumulator + (product.quantity * product.price)
    }, 0);
}

const calculateDiscountRate = (subtotal) => {
    /*
    Discount Rules:
    ---------------
    If buying more than 5 products, discount is 15% of subtotal.
    If subTotal is equal or greater than 100
    Discount is 10% of subtotal.
    Any other case, discount is 5% of subtotal.
    Always use maximum discount possible.
    */

    var discountRate = 0;
    if (products.length > 5) {
        discountRate = 0.15;
    } else if (subtotal >= 100) {
        discountRate = 0.10;
    } else {
        discountRate = 0.05;
    }

    return discountRate;
}

const displayPercentage = (rate) => {
    return ' (' + Math.round(rate * 100) + '%)'
}

const drawTotals = () => {
    const subTotal = calculateSubTotal();
    const discountRate = calculateDiscountRate(subTotal); // note that this function already returns a negative value.
    const discount = subTotal * -discountRate;
    const subTotalWithDiscount = subTotal + discount;
    const totalTaxes = subTotalWithDiscount * TAXES;
    const total = subTotalWithDiscount + totalTaxes;
    document.querySelector('.totals .subtotal').textContent = subTotal.toFixed(2);
    document.querySelector('.totals .discount').textContent = discount.toFixed(2) + displayPercentage(discountRate);
    document.querySelector('.totals .taxes').textContent = totalTaxes.toFixed(2) + displayPercentage(TAXES);
    document.querySelector('.totals .total').textContent = total.toFixed(2);
}

const start = () => {
    drawTable();

    drawTotals();

    // More info: https://api.jquery.com/submit/
    $('#addToCartForm').submit((event) => {
        event.preventDefault(); // Avoid sending the form to a server (not needed here).
        console.log('A new product want to be created, but not implemented yet!');
        event.target.reset(); // Reset form after submission.
    });
}

start();