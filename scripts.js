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

    all: transactions,

    add(transaction){
        Transaction.all.push(transaction);
    },

    incomes() {

        let inc = 0;
        Transaction.all.forEach((transaction) => { 
            if(transaction.amount > 0) {
                inc += transaction.amount;
            }

        });
        return inc;
    },

    expenses() {
        let exp = 0;

        Transaction.all.forEach((transaction) => {

            if (transaction.amount < 0) {
                exp += transaction.amount;
            }

        });

        return exp;
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();
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

        const cssClass = transaction.amount > 0 ? "income" : "expense";
        const amount = Utils.formatCurrency(transaction.amount);

        const html =
            `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
    `
        return html;
    },

    updateBalance() {
        document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        return (signal + value);
    }
}

transactions.forEach((transaction) => { DOM.addTransaction(transaction) });

DOM.updateBalance();

