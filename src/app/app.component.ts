import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EmployeeTransferRecordEncloserDto } from './model/EmployeeTransferRecordEncloserDto';
import { EmployeeTransferRecordEncloserProfile } from './model/EmployeeTransferRecordEncloserProfile';
import { EncloserService } from './service/encloser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  form: FormGroup;

  dto: EmployeeTransferRecordEncloserDto = new EmployeeTransferRecordEncloserDto();

  @ViewChild('filesDom', { static: false }) filesDom: ElementRef;

  enclosers: any = new Array();

  disabledDeleteButton = false;

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private encloserService: EncloserService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.form = this.fb.group({
      employeeId: [''],
      recordId: [''],
      files: this.fb.array([this.fb.group({
        id: [''],
        encloserId: [''],
        encloserName: [''],
        encloserNameBn: [''],
        encloserType: [''],
        encloserUrl: ['']
      })])
    });
  }

  onSubmit() {
    this.dto = Object.assign({}, this.form.value);
    var listItems = this.elementRef.nativeElement.querySelector('.filesDom').getElementsByTagName('li');
    this.dto.files.forEach((element, index) => {
      var profile = new EmployeeTransferRecordEncloserProfile()
      profile.encloserId = element.encloserId;
      profile.encloserName = element.encloserName;
      profile.encloserNameBn = element.encloserNameBn;
      profile.encloserType = element.encloserType;
      profile.encloserUrl = listItems[index].innerHTML;
      this.enclosers.push(profile);
    });
    this.dto.files = this.enclosers;
    console.log(this.dto);

    this.encloserService.save(this.dto).subscribe(data => {
      this.form.reset();
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }

  get profiles() {
    return this.form.get('files') as FormArray;
  }

  addExams() {
    if (this.profiles.length == 2) {
      alert("Maximum 2 exams are allowed.");
      return;
    }
    this.profiles.push(this.fb.group({
      id: [''],
      encloserId: [''],
      encloserName: [''],
      encloserNameBn: [''],
      encloserType: [''],
      encloserUrl: ['']
    }));

    if (this.profiles.length > 0) {
      this.disabledDeleteButton = true;
    }
  }

  deleteExams(index: any) {
    if (this.profiles.length > 0) {
      this.profiles.removeAt(index);
    }
    if (this.profiles.length === 1) {
      this.disabledDeleteButton = false;
    }
  }

  onSelect(event: any) {
    let file = event.target.files[0];
    this.convertToBase64(file).then(data => {
      var mainPart = data.split(',')[1];
      var d1 = this.elementRef.nativeElement.querySelector('.filesDom');
      d1.insertAdjacentHTML('beforeend', '<li>' + mainPart + '</li>');
    });
  }

  private convertToBase64(file: any): Promise<any> {
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
