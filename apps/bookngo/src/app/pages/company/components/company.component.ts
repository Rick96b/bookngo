import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TuiAccordionModule, TuiAvatarModule, TuiInputModule } from '@taiga-ui/kit';
import { Company, CompanyService, User, Vacation } from '@bookngo/base'
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FilterByDepartmentPipe } from '../pipes/filterByDepartment.pipe';
import { TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormatEmployeesPipe } from '../pipes/formatEmployees.pipe';

@Component({
    selector: 'app-tab-bar',
    standalone: true,
    imports: [
        TuiAvatarModule,
        TuiAccordionModule,
        CommonModule,
        FilterByDepartmentPipe,
        TuiSvgModule,
        ReactiveFormsModule,
        FormatEmployeesPipe,
        TuiInputModule,
        TuiButtonModule,
        TuiTextfieldControllerModule
    ],
    templateUrl: './company.component.html',
    styleUrl: './company.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
    company: Company | null = null
    ceo: User 
    users: User[] = []
    addDepartmentForm: FormGroup
    constructor(private _companyService: CompanyService, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this._companyService.getCompany().pipe(
            tap(company => this.company = company)
        ).subscribe()
        this._companyService.getUsers().pipe(
            tap(users => {
                this.users = users
                this.ceo = users.filter(user => user.employmentStatus === 'ceo')[0]
            })
        ).subscribe()
        this.addDepartmentForm = this._fb.group({
            departmentName: ['', Validators.required]
        })
    }

    addDepartment() {
        this._companyService.addDepartment(this.addDepartmentForm.controls['departmentName'].value)
    }


}
