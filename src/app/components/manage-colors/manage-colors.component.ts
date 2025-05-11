import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Color {
    id: number;
    name: string;
    hex: string;
}

@Component({
  selector: 'app-manage-colors',
  standalone: true, // Mark it as a standalone component.
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-colors.component.html',
  styleUrls: ['./manage-colors.component.css']
})

export class MangeColorsComponent {
    //"database" of colors
    colors: Color[] = [];
    nextId: number = 1;

    newColorName: string = '';
    newColorHex: string = '';

    editingColor: Color | null = null;
    editColorName: string = '';
    editColorHex: string = '';

    errorMessage: string = '';

    colorToDelete: Color | null = null;
    deleteErrorMessage: string = '';


    constructor(){
        const initialColors: Color[] = [
            { id: this.nextId++, name: 'red',    hex: '#ff0000' },
            { id: this.nextId++, name: 'orange', hex: '#ffa500' },
            { id: this.nextId++, name: 'yellow', hex: '#ffff00' },
            { id: this.nextId++, name: 'green',  hex: '#00ff00' },
            { id: this.nextId++, name: 'blue',   hex: '#0000ff' },
            { id: this.nextId++, name: 'purple', hex: '#800080' },
            { id: this.nextId++, name: 'grey',   hex: '#808080' },
            { id: this.nextId++, name: 'brown',  hex: '#a52a2a' },
            { id: this.nextId++, name: 'black',  hex: '#000000' },
            { id: this.nextId++, name: 'teal',   hex: '#008080' }
            ];
            this.colors = [...initialColors];
    }


    



    //ADD
    addColor(){
        this.errorMessage = '';
        if (!this.newColorName.trim() || !this.newColorHex.trim()) {
        this.errorMessage = 'Both color name and hex value are required.';
        return;
    }

    const duplicateName = this.colors.find(c => c.name.toLowerCase() === this.newColorName.toLowerCase());
    const duplicateHex = this.colors.find(c => c.hex.toLowerCase() === this.newColorHex.toLowerCase());
    if (duplicateName) {
        this.errorMessage = 'A color with that name already exists.';
        return;
    }
    if (duplicateHex) {
        this.errorMessage = 'A color with that hex code already exists.';
        return;
    }
        const newColor: Color = {
        id: this.nextId++,
        name: this.newColorName.trim(),
        hex: this.newColorHex.trim()
    };
    this.colors.push(newColor);

    //clears the form
    this.newColorName = '';
    this.newColorHex = '';
    }





    //EDIT
    startEditing(color: Color) {
        // Load the color details into the editing form
        this.editingColor = { ...color };
        this.editColorName = color.name;
        this.editColorHex = color.hex;
        this.errorMessage = '';
    }

    cancelEditing() {
        this.editingColor = null;
        this.editColorName = '';
        this.editColorHex = '';
    }


    saveEdit(){
        if (!this.editingColor) { return; }
        if (!this.editColorName.trim() || !this.editColorHex.trim()) {
            this.errorMessage = 'Both color name and hex value are required for editing.';
            return;
        }
        // Check uniqueness for name and hex (excluding the color being edited)
        const duplicateName = this.colors.find(c => c.name.toLowerCase() === this.editColorName.toLowerCase() && c.id !== this.editingColor!.id);
        const duplicateHex = this.colors.find(c => c.hex.toLowerCase() === this.editColorHex.toLowerCase() && c.id !== this.editingColor!.id);
        if (duplicateName) {
            this.errorMessage = 'Another color with that name already exists.';
            return;
        }
        if (duplicateHex) {
            this.errorMessage = 'Another color with that hex code already exists.';
            return;
        }
        // Update the color in the "database"
        this.colors = this.colors.map(c => {
        if (c.id === this.editingColor!.id) {
            return { id: c.id, name: this.editColorName.trim(), hex: this.editColorHex.trim() };
        }
        return c;
        });
        this.cancelEditing();
    }





    //DELETE
    requestDelete(color: Color) {
        this.deleteErrorMessage = '';
        if (this.colors.length < 3) {
            this.deleteErrorMessage = 'At least two colors must remain. Cannot delete.';
            return;
        }
        this.colorToDelete = color;
    }

    confirmDelete() {
        if (this.colorToDelete) {
            this.colors = this.colors.filter(c => c.id !== this.colorToDelete!.id);
            this.colorToDelete = null;
        }
    }

    cancelDelete() {
        this.colorToDelete = null;
    }
}