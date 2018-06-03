import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatButtonModule } from "@angular/material";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';






@NgModule({
    imports: [ MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, FlexLayoutModule, 
        MatCardModule, MatDividerModule, MatCheckboxModule, MatExpansionModule, MatListModule, MatProgressBarModule ],
    exports: [ MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, FlexLayoutModule,
        MatCardModule, MatDividerModule, MatCheckboxModule, MatExpansionModule, MatListModule, MatProgressBarModule ]
})

export class MaterialModule{}