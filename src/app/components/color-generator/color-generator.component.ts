import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-color-generator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './color-generator.component.html',
  styleUrls: ['./color-generator.component.css']
})
export class ColorGeneratorComponent {
  form: FormGroup;
  showTables: boolean = false;

  numRows: number = 0;
  numCols: number = 0;
  numColors: number = 0;

  colorOptions: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
  tableColors: string[] = [];

  selectedRowIndex: number = 0;
  paintedCells: number[][] = [];
  colorCoordinates: string[][] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
      columns: [null, [Validators.required, Validators.min(1), Validators.max(702)]],
      colors: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  get rowsValue() { return this.form.get("rows"); }
  get columnsValue() { return this.form.get("columns"); }
  get colorsValue() { return this.form.get("colors"); }

  onSubmit(): void {
    if (this.form.invalid) {
      alert("Please fix errors in the form before submitting.");
      return;
    }

    this.numRows = this.form.value.rows;
    this.numCols = this.form.value.columns;
    this.numColors = this.form.value.colors;

    this.tableColors = this.colorOptions.slice(0, this.numColors);
    this.selectedRowIndex = 0;
    this.showTables = true;

    this.paintedCells = Array.from({ length: this.numRows }, () => Array(this.numCols).fill(-1));
    this.colorCoordinates = Array.from({ length: this.numColors }, () => []);
  }

  getAvailableColors(rowIndex: number): string[] {
    const selectedExcludingCurrent = this.tableColors.filter((color, idx) => idx !== rowIndex);
    return this.colorOptions.filter(color =>
      !selectedExcludingCurrent.includes(color) || color === this.tableColors[rowIndex]
    );
  }

  onColorChange(rowIndex: number, event: any): void {
    this.tableColors[rowIndex] = event.target.value;
    this.selectedRowIndex = rowIndex;
  }

  onRowSelect(rowIndex: number): void {
    this.selectedRowIndex = rowIndex;
  }

  getLetterColumnName(index: number): string {
    let dividend = index + 1;
    let colName = '';
    while (dividend > 0) {
      let modulo = (dividend - 1) % 26;
      colName = String.fromCharCode(65 + modulo) + colName;
      dividend = Math.floor((dividend - modulo) / 26);
    }
    return colName;
  }

  cellClicked(row: number, col: number): void {
    const r = row - 1;
    const c = col - 1;
    const coord = `${this.getLetterColumnName(c)}${row}`;
    const oldColorIndex = this.paintedCells[r][c];

    // Remove old coordinate if it was already painted
    if (oldColorIndex !== -1) {
      const index = this.colorCoordinates[oldColorIndex].indexOf(coord);
      if (index > -1) {
        this.colorCoordinates[oldColorIndex].splice(index, 1);
      }
    }

    // Update paintedCells
    this.paintedCells[r][c] = this.selectedRowIndex;

    // Add new coordinate only if not already present
    if (!this.colorCoordinates[this.selectedRowIndex].includes(coord)) {
      this.colorCoordinates[this.selectedRowIndex].push(coord);
      this.colorCoordinates[this.selectedRowIndex].sort((a, b) => a.localeCompare(b));
    }
  }

  printPage(): void {
    window.print();
  }
}

  printPage(): void {
    window.print();
  }
}
