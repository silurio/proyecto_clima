import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TranslateModule,
        ReactiveFormsModule,
        OverlayModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ]
})
export class SharedModule { }
