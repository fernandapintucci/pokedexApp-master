import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pagina = 1;
  public totalPaginas = 0;

  public next: string;
  public previous: string;

  public listaPokemonExibir = [];

  public listaPokemonApi = [];

  constructor(private pokemonService: PokemonService) {
    this.buscarPokemons();
  }


  public async buscarPokemons() {
    await this.pokemonService.buscarPokemons().subscribe(dados => {
      this.listaPokemonApi = [];
      this.totalPaginas = dados['count'] / 10;

      this.previous = dados['previous'];
      this.next = dados['next'];

      let listaApi = dados['results'];

      for (let item of listaApi) {
        this.pokemonService.buscaPokemonNumero(item.url).subscribe(dadosPokemons => {
          this.listaPokemonExibir.push(dadosPokemons);

          this.ordenarLista();
        });
      }
    });
  }

  private ordenarLista(){
    this.listaPokemonApi.sort((a,b) => {
      if(a.id > b.id) {
        return 1;
      }
      if(a.id <b.id){
        return -1;
      }
      return 0;
    });
    this.listaPokemonExibir=this.listaPokemonApi;
  }

  public paginacao(url, movimento){
    this.pagina = this.pagina + movimento;
    this.pokemonService.url = url;
    this.buscarPokemons();
  }
}