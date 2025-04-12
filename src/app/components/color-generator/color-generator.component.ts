import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-color-generator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './color-generator.component.html',
  styleUrl: './color-generator.component.css'
})
export class ColorGeneratorComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
      columns: [null, [Validators.required, Validators.min(1), Validators.max(702)]],
      colors: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  get rowsValue() {
    return this.form.get("rows");
  }

  get columnsValue() {
    return this.form.get("columns");
  }

  get colorsValue() {
    return this.form.get("colors");
  }
}
