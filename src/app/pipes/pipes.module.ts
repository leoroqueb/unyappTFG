import { NgModule } from '@angular/core';
import { FiltroBusquedaPipe } from './filtro-busqueda.pipe';
import { ListFilterPipe } from './list-filter.pipe';
import { FiltroIoncardsPipe } from './filtro-ioncards.pipe';




@NgModule({
  declarations: [
    FiltroBusquedaPipe, 
    ListFilterPipe, FiltroIoncardsPipe,
  ],
  exports:[
    FiltroBusquedaPipe, 
    ListFilterPipe,
    FiltroIoncardsPipe
  ],
})
export class PipesModule { }
