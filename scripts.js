const Modal = {

    toggle() {

        if (document.querySelector('.modal-overlay').classList.contains('active')) {

            document.querySelector('.modal-overlay.active').classList.remove('active');

        } else {

            document.querySelector('.modal-overlay').classList.add('active');
        }

    }

}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '24/01/2021'
    },
    {
        id: 3,
        description: 'Aluguel',
        amount: -150000,
        date: '26/01/2021'
    },
    {
        id: 4,
        description: 'Academia',
        amount: -5000,
        date: '27/01/2021'
    },
    {
        id: 5,
        description: 'App',
        amount: 400000,
        date: '28/01/2021'
    }
];
const Transaction = {

    incomes() {
        // somar entradas
    },
    expenses() {
        // somar saídas
    },
    total() {
        // entradas - saídas
    }

}

const DOM = {

    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement("tr");
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {

        const cssClass  = transaction.amount > 0 ? "income" : "expense";
        const amount = Utils.formatCurrency(transaction.amount);

        const html =
            `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
    `
    return html;
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        console.log(`${value/100}`)
    }
}

transactions.forEach((transaction) => {DOM.addTransaction(transaction)});

