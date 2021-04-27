const Modal = {

    toggle() {

        if (document.querySelector('.modal-overlay').classList.contains('active')) {

            document.querySelector('.modal-overlay.active').classList.remove('active');

        } else {

            document.querySelector('.modal-overlay').classList.add('active');
        }

    }

}

const Transaction = {

    all: [{
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        description: 'Website',
        amount: 500000,
        date: '24/01/2021'
    },
    {
        description: 'Aluguel',
        amount: -150000,
        date: '26/01/2021'
    },
    {
        description: 'Academia',
        amount: -5000,
        date: '27/01/2021'
    },
    {
        description: 'App',
        amount: 400000,
        date: '28/01/2021'
    }],

    add(transaction) {
        Transaction.all.push(transaction);
        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);
        App.reload();
    },

    incomes() {

        let inc = 0;
        Transaction.all.forEach((transaction) => {
            if (transaction.amount > 0) {
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
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    formatAmount(amount) {
        
    },
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

const Form = {

    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),

    getValues() {

        return {
            description: this.description.value,
            amount: this.amount.value,
            date: this.date.value

        }

    },
    validateFields() {
        const { description, amount, date } = this.getValues();

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {

            throw new Error("Preencha todos os campos!");
        }
    },

    formatValues() {
        let { description, amount, date } = this.getValues();
        amount = Utils.formatAmount(amount);
    },
    submit(event) {
        event.preventDefault();

        try {
            this.validateFields();
            this.formatValues();
            // verificar se todas as informações foram preenchidas
            // formatar os dados para salvar
            // salvar
            // apagar os dados do formulário
            // fechar o modal
        } catch (error) {
            alert(error.message);
        }

    }
}
const App = {
    init() {
        Transaction.all.forEach((transaction) => { DOM.addTransaction(transaction) });
        DOM.updateBalance();

    },
    reload() {
        DOM.clearTransactions();
        App.init();
    }
}

App.init();

