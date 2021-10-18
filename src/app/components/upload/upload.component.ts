import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form: FormGroup;

  user : User = new User;

  disabledDeleteButton = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(){
    this.form = this.fb.group({
      exams: this.fb.array([this.fb.group({
        examName: [''],
        certificate: ['']
      })])
    });
  }

  onSubmit() {
    this.user = Object.assign({}, this.form.value);
    console.log(this.user);
  }
  
  get exams() {
    return this.form.get('exams') as FormArray;
  }

  addExams() {
    if (this.exams.length == 2) {
      alert("Maximum 2 exams are allowed.");
      return;
    }
    this.exams.push(this.fb.group({
      examName: [''],
      certificate: ['']
    }));

    if (this.exams.length > 0) {
      this.disabledDeleteButton = true;
    }
  }

  deleteExams(index: any) {
    if (this.exams.length > 0) {
      this.exams.removeAt(index);
    }
    if (this.exams.length === 1) {
      this.disabledDeleteButton = false;
    }
  }

  onSelect(event: any) {
    let file = event.target.files[0];
    console.log(file);
  }

}
