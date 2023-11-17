import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoExecucao } from '../decorators/logar-tempo-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {

    // Decorator que sobreescreve a propriedade para ser abstraído como um getter que faz o querySelector no id passado na função

    // Decorator é aplicado quando a classe e suas properties são instânciadas
    @domInjector('#data') 
    private inputData: HTMLInputElement;

    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;

    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    private negociacaoService = new NegociacoesService

    constructor() {
        
        this.negociacoesView.update(this.negociacoes);

    }

    @inspect
    @logarTempoExecucao(true)
    public adiciona(): void {
        
        const negociacao = Negociacao.criaDe(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        );
     
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas');
            return ;
        }

        this.negociacoes.adiciona(negociacao);

        imprimir(negociacao, this.negociacoes)

        this.limparFormulario();
        this.atualizaView();

    }

    public importarDados(): void {

        this.negociacaoService

            .obterNegociacoesDiarias()

            .then(negociacoesAtuais => {

                return negociacoesAtuais.filter(negociacaoFiltrar => {

                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao
                            .duplicata(negociacaoFiltrar)
                        )

                })

            })

            .then(negociacoesAtuais => {

                for (let negociacao of negociacoesAtuais) {

                    this.negociacoes.adiciona(negociacao)

                }

                this.negociacoesView.update(this.negociacoes)

            })
        

    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }

    
}
