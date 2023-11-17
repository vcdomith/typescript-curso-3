import { inspect } from "../decorators/inspect.js";
import { logarTempoExecucao } from "../decorators/logar-tempo-execucao.js";

export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);
        }
    }

    // Sem a closure o decorator pode ser chamado direto sem os parenteses, porque ele já é a própria função
    // @inspect
    // @logarTempoExecucao(true)
    public update(model: T): void {

        let template = this.template(model);

        this.elemento.innerHTML = template;
        
    }

    protected abstract template(model: T): string;
}