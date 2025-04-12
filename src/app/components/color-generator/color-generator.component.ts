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

  //used to store the submitted values
  numRows: number = 0;
  numCols: number = 0;
  numColors: number = 0;

  colorOptions: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
  tableColors: string[] = []

  selectedRowIndex: number = 0;

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

  //runs when push submit button
  onSubmit(): void{
    if (this.form.invalid) {
      return; //error message????
    }
    this.numRows = this.form.value.rows;
    this.numCols = this.form.value.columns;
    this.numColors = this.form.value.colors;

    this.tableColors = []
    for(let i = 0; i < this.numColors; i++){
      this.tableColors.push(this.colorOptions[i]);
    }
    this.selectedRowIndex = 0;
    this.showTables = true;
  }

  //table 1 - get arr of available colors for row
  getAvailableColors(rowIndex: number): string[] {
    const selectedExcludingCurrent = this.tableColors.filter((color, idx) => idx !== rowIndex);
    return this.colorOptions.filter(color => !selectedExcludingCurrent.includes(color) || color === this.tableColors[rowIndex]);
  }

  onColorChange(rowIndex: number, event: any): void{ //handle radio button
    this.selectedRowIndex = rowIndex;
  }

  onRowSelect(rowIndex: number): void{
    this.selectedRowIndex = rowIndex;
  }

  getLetterColumnName(index: number): string{ 
    let dividend = index+1;
    let colName = '';
    while (dividend > 0){
      let modulo = (dividend-1) % 26;
      colName = String.fromCharCode(65+modulo) + colName;
      dividend = Math.floor((dividend-modulo) / 26);
    }
    return colName
  }

  //table 2 click
  cellClicked(row: number, col: number): void {
    const colLabel = this.getLetterColumnName(col-1);
    alert(`${colLabel}${row}`);
  }

  printPage(): void {
    window.print();
  }
}
