class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoTipoConta = document.querySelector('#tipo_conta')

        let conta;
        const numero = elementoNumero.value
        const saldo = Number(elementoSaldo.value)

        switch (elementoTipoConta.value) {
            case 'conta':
                conta = new Conta(numero, saldo)
                break
            case 'conta_bonificada':
                conta = new ContaBonificada(numero, saldo)
                break
            case 'conta_poupanca':
                const elementoDataAniversario = document.querySelector('#data_aniversario');
                const dataAniversario = new Date(elementoDataAniversario.value)
                conta = new ContaPopanca(numero, saldo, dataAniversario)
                break
        }

        this.repositorioContas.adicionar(conta);
        this.inserirContaNoHTML(conta);
    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');

        let dataAniversario = ''
        if (conta.dataAniversario) {
            dataAniversario = ' - Aniversário: ' + conta.dataAniversario.toLocaleDateString('pt-BR');
        }

        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo + dataAniversario;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
