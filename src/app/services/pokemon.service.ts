import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

  constructor(private httpClient: HttpClient) { }

  public buscarPokemons() {
    return this.httpClient.get(this.url);
  }

  public buscaPokemonNumero(url: string) {
    return this.httpClient.get(url);
  }
}