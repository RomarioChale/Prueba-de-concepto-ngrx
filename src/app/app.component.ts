import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  IncrementarAction,
  DecrementarAction
} from "./contador/contador.actions";
import { HttpClient } from "@angular/common/http";
interface AppState {
  count: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  contador: number;

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.store.select("count").subscribe(state => (this.contador = state));

  }

  async incrementar() {
    try {
      let response = await this.http
        .get("https://reqres.in/api/users")
        .toPromise();
      console.log(response);
      const accion = new IncrementarAction();
      this.store.dispatch(accion);
    } catch (e) {
      const accion = new DecrementarAction();
      this.store.dispatch(accion);

    }
  }

  decrementar() {
    const accion = new DecrementarAction();
    this.store.dispatch(accion);
  }
}
