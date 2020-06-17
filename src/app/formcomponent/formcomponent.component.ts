import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'; 

@Component({
  selector: 'formcomponent',
  templateUrl: './formcomponent.component.html',
  styleUrls: ['./formcomponent.component.scss']
})
export class FormcomponentComponent implements OnInit {
  
  // checkbox value
  labelPosition: 'before' | 'after' = 'after';
  // ends checkbox 
  myControl = new FormControl;
  options:string[] = ['One','Two','Three','Four'];
  filterOptions:Observable<string[]>;


  constructor() { }

  ngOnInit(): void {
    this.filterOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }

  private _filter(value:string): string[]{
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue)===0);
   }
}
