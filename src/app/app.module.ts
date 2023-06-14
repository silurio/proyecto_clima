import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // TranslateModule.forRoot({
    //   defaultLanguage: 'es',
    //   loader: {
    //       provide: TranslateLoader,
    //       useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
    //       deps: [HttpClient]
    //   }
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
