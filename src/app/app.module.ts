import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent, HelpDialog} from './app.component';
import {ClipboardModule} from "ngx-clipboard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import { MailListComponent } from './mail-list/mail-list.component';
import { PulseComponent } from './pulse/pulse.component';
import {RouterModule} from "@angular/router";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { MailFilterPipe } from './mail-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MailListComponent,
    PulseComponent,
    HelpDialog,
    MailFilterPipe
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'mail', pathMatch: 'full'},
      {path: 'mail', component: MailListComponent},
      {path: 'pulse', component: PulseComponent},
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
