import { NgModule } from '@angular/core';
import { FiltroBusquedaPipe } from './filtro-busqueda.pipe';




@NgModule({
  declarations: [FiltroBusquedaPipe],
  exports:[FiltroBusquedaPipe],
})
export class PipesModule { }
