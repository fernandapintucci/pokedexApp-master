import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Código realizado com ajuda da aluna Sarita Breda

  public pagina = 1;
  public totalPagina = 105;

  public listaPokemonExibir: any = [];
  public totalPokemon: number;

  private url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

  constructor(private pokemonService: PokemonService) { }

  ionViewWillEnter() {
    this.buscarPokemons(1);
  }

  public buscarPokemons(pagina: number) {
    if (pagina <= 0) {
      pagina = 1;
    }
    this.pagina = pagina;

    this.pokemonService.buscarPokemon(this.url).subscribe(dados => {
      this.listaPokemonExibir = [];
      this.totalPokemon = dados['count'];
      let listaApi = dados['results'];

      for (let pokemon of listaApi) {
        this.pokemonService.buscaDePokemon(pokemon.url).subscribe(dadosPokemons => {
          this.listaPokemonExibir.push(dadosPokemons);
        });
      }
    });
  }
}