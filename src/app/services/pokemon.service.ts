import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

  constructor(private httpClient: HttpClient) { }

  // Código realizado com ajuda da aluna Sarita Breda

  public BuscarTodos(pagina: number) {
    if (pagina <= 0) {
      pagina = 1;
    }
    return this.httpClient.get(`${this.url}?offset=${pagina}`);
  }

  public buscarPokemon(url: string) {
    return this.httpClient.get(url);
  }

  public buscaDePokemon(url: string) {
    return this.httpClient.get(`${url}`);
  }

  public buscarPorId(id: number) {
    return this.httpClient.get(`${this.url}/${id}`);
  }
}