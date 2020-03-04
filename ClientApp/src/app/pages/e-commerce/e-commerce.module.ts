import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NbInputModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ECommerceComponent,
  ],
  providers: [
  ],
})
export class ECommerceModule { }
