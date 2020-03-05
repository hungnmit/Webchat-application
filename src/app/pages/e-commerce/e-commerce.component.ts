import { Component } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';
import { HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss'],
})
export class ECommerceComponent {
  settings = {
    mode: 'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        editable:false,
      },
      password: {
        title: 'Password',
        type: 'string',
      },
      dateReceived: {
        title: 'Date Received',
        type: 'Date',
        valuePrepareFunction: (dateReceived) => {
          var raw = new Date(dateReceived);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy HH:mm:ss');
          return formatted;
        },
        defaultValue: new Date().toLocaleString(),
        editable:false,
        addable: false,
      },
    },
  };

  //Get data from table agent

  renderValue: string;

  constructor(private http: HttpClient,private datePipe: DatePipe){
  }
  source:any = [];
  ngOnInit(): void {
      this.http.get<ListAgents[]>(environment.url).subscribe(
        data => {
          this.source = data['result'];
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  //event delete button
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.http.delete<ListAgents[]>(environment.urldelete + event.data.id).subscribe(result => {
        event.confirm.resolve(event.data);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
    } else {
      event.confirm.reject();
    }
  };
  //event create button
  onCreateConfirm(event):void {
    console.log(this.source)
    console.log(event)
    if (window.confirm('Are you sure you want to add new agent?')) {
      // if(this.source.included(event.newData.id))
      // {
      //   this.renderValue = 'error';
      //   event.confirm.reject();
      // }
      this.http.post<ListAgents[]>(environment.urlCreate,event.newData).subscribe(result => {
        //this.settings = Object.assign({}, this.settings);
        event.confirm.resolve(event.newData);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
    } else {
      event.confirm.reject();
    }
  };
  //event edit button
  onSaveConfirm(event):void {
    console.log(this.source)
    console.log(event)
    console.log(this.source.included(event.newData.id))

    if (window.confirm('Are you sure you want to update?')) {
      this.http.put<ListAgents[]>(environment.urlUpdate + event.data.id, event.newData).subscribe(result => {
        console.log(result)
        event.confirm.resolve(event.newData);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
    } else {
      event.confirm.reject();
    }
  };
}

export interface ListAgents {
  id: string;
  password: string;
  dateReceived: string;
};
