import {ListaNegociacoes} from '../models/lista-negociacoes';
import {Message} from '../models/message';
import {Negociacao} from '../models/negociacao';

import {MainView} from '../views/main-view';
import {MessageView} from '../views/message-view';

import {NegociacaoService} from '../services/negociacao-service';

import {DateHelper} from '../helpers/date-helper.js';
import {Bind} from '../helpers/bind.js';

class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new MainView($('#mainView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._message = new Bind(
            new Message(), new MessageView($('#messageView')),
            'text');

        this._ordemAtual = ''

        this._service = new NegociacaoService();

        this._init();

    }

    _init() {
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                this._message.text = erro;
            });

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(msg => {
                this._listaNegociacoes.adiciona(negociacao);
                this._message.text = msg;
                this._limpaFormulario();
            })
            .catch(erro => this._message.text = erro);

    }

    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._message.text = 'Negociações do período importadas'
            }))
            .catch(erro => this._message.text = erro);
        
    }

    apaga() {

        this._service
            .apaga()
            .then(msg => {
                this._message.text = msg;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._message.text = erro);
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    ordena(coluna) {

        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);
        }
        this._ordemAtual = coluna;
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
    return negociacaoController;
}
