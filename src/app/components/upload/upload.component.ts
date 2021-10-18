import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  @ViewChild('filesDom', { static: false }) filesDom: ElementRef;

  users: User[] = new Array<User>();
  disabledDeleteButton = false;

  constructor(private fb: FormBuilder, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.form = this.fb.group({
      exams: this.fb.array([this.fb.group({
        examName: [''],
        certificate: ['']
      })])
    });
  }

  onSubmit() {
    var formValue = Object.assign({}, this.form.value);
    var listItems = this.elementRef.nativeElement.querySelector('.filesDom').getElementsByTagName('li');

    formValue.exams.forEach((element, index) => {
      var user = new User()
      user.examName = element.examName;
      user.certificate = listItems[index].innerHTML;
      this.users.push(user);
    });
    console.log(this.users);
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
    this.readBase64(file).then(data => {
      debugger
      var mainPart = data.split(',')[1];
      var d1 = this.elementRef.nativeElement.querySelector('.filesDom');
      d1.insertAdjacentHTML('beforeend', '<li>' + mainPart + '</li>');
    });
  }

  private readBase64(file): Promise<any> {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    return future;
  }
}
