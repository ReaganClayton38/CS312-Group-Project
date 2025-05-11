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

  //Added this.
  selectedRowIndex: number = 0;
  paintedCells: number[][] = [];
  colorCoordinates: string [][] = [];

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

    //Added this.
    this.paintedCells = Array.from({ length: this.numRows }, () => Array(this.numCols).fill(-1));
    this.colorCoordinates = Array.from({ length: this.numColors }, () => []);
  }

  //table 1 - get arr of available colors for row
  getAvailableColors(rowIndex: number): string[] {
    const selectedExcludingCurrent = this.tableColors.filter((color, idx) => idx !== rowIndex);
    return this.colorOptions.filter(color => !selectedExcludingCurrent.includes(color) || color === this.tableColors[rowIndex]);
  }

  onColorChange(rowIndex: number, event: any): void{
    this.tableColors[rowIndex] = event.target.value;
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
  //Updated:
  cellClicked(row: number, col: number): void {
    const r = row - 1;
    const c = col - 1;
    const coord = '${this.getLetterColumnName(c)}${row}';
    const oldColorIndex = this.paintedCells[r][c];

    if(oldColorIndex !== -1){
      const index = this.colorCoordinates[oldColorIndex].indexOf(coord);
      if(index > -1){
        this.colorCoordinates[oldColorIndex].splice(index, 1);
      }
    }

    this.paintedCells[r][c] = this.selectedRowIndex;

    //add coord to acive color's list if not already there
    if(this.colorCoordinates[this.selectedRowIndex].includes(coord)){
      this.colorCoordinates[this.selectedRowIndex].push(coord);
      this.colorCoordinates[this.selectedRowIndex].sort((a, b) => a.localeCompare(b)); //sorts by name then number
    }
    //alert(`${colLabel}${row}`); //alert makes pup-up when you click a cell in table 2
  }

  printPage(): void {
    window.print();
  }
}
