import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

// import { AppComponent } from './app.component'; // ***

// Add dependencies for helgoland components.
import {
  SplittedDataDatasetApiInterface,
  DatasetApiInterface,
  DatasetApiV1ConnectorProvider,
  DatasetApiV2ConnectorProvider,
  DatasetApiV3ConnectorProvider
} from '@helgoland/core';
import { HelgolandD3Module } from '@helgoland/d3';
import { HelgolandModificationModule } from '@helgoland/modification';

// Add dependencies for translations.
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { D3TimeseriesGraphWrapperComponent } from './d3-timeseries-graph-wrapper/d3-timeseries-graph-wrapper.component';


@NgModule({
  declarations: [
    // AppComponent, // ***
    D3TimeseriesGraphWrapperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HelgolandD3Module,
    HelgolandModificationModule
  ],
  providers: [
    {
      provide: DatasetApiInterface,
      useClass: SplittedDataDatasetApiInterface
    },
    DatasetApiV1ConnectorProvider,
    DatasetApiV2ConnectorProvider,
    DatasetApiV3ConnectorProvider
  ],
  entryComponents: [
    D3TimeseriesGraphWrapperComponent
  ],
  // bootstrap: [AppComponent] // ***
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(D3TimeseriesGraphWrapperComponent, { injector });
    customElements.define('d3-timeseries-graph-wrapper', custom);
  }

  ngDoBootstrap() { }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

