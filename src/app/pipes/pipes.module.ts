import { NgModule } from '@angular/core';
import { FiltroBusquedaPipe } from './filtro-busqueda.pipe';
import { ListFilterPipe } from './list-filter.pipe';





@NgModule({
  declarations: [
    FiltroBusquedaPipe, 
    ListFilterPipe,
  ],
  exports:[
    FiltroBusquedaPipe, 
    ListFilterPipe,
  ],
})
export class PipesModule { }
